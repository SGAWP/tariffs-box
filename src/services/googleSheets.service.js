import { google } from "googleapis";
import { createOAuth2Client } from './google.auth.service.js';
import { fetchData } from './warehouseTariff.service.js';


/**
 * Получает клиента для работы с Google Sheets API.
 * @returns {Promise<import('googleapis').sheets_v4.Sheets>}
 */
async function getSheetsClient() {
  const oauth2Client = await createOAuth2Client();
  return google.sheets({ version: 'v4', auth: oauth2Client });
}

/**
 * Подготавливает данные для загрузки в Google Sheets.
 * @param {Array<{ box_delivery_and_storage_expr: string | number, [key: string]: any }>} data 
 * @returns {Array<Array<string | number>>}
 */
function prepareSheetData(data) {
  return [
    [
      'Warehouse Name', 'Next Box Date', 'Till Max Date',
      'Delivery & Storage Expr', 'Delivery Base', 'Delivery per Liter',
      'Storage Base', 'Storage per Liter'
    ],
    ...data.map(row => {
      let expr = row.box_delivery_and_storage_expr;
      
      // Проверяем тип expr, если это строка, пробуем преобразовать в число
      if (typeof expr === 'string' && !isNaN(Number(expr))) {
        expr = Number(expr); // Преобразуем строку в число, если это возможно
      }
      
      row.box_delivery_and_storage_expr = expr;
      return Object.values(row);
    })
  ];
}

/**
 * Обновляет данные на листе Google Sheets.
 * @param {string} sheetId - Идентификатор листа.
 * @param {Array<Array<string | number>>} sheetData - Данные для обновления.
 * @param {import('googleapis').sheets_v4.Sheets} sheets - Клиент Google Sheets API.
 * @returns {Promise<void>}
 */
async function updateSheet(sheetId, sheetData, sheets) {
  const resource = { values: sheetData };
  const request = {
    spreadsheetId: sheetId,
    range: 'stocks_coefs!A1',
    valueInputOption: 'RAW',
    resource,
  };

  await sheets.spreadsheets.values.update(request);
}

/**
 * Сортирует данные на листе Google Sheets.
 * @param {string} sheetId - Идентификатор листа.
 * @param {import('googleapis').sheets_v4.Sheets} sheets - Клиент Google Sheets API.
 * @returns {Promise<void>}
 */
async function sortSheet(sheetId, sheets) {
  const sortRequest = {
    spreadsheetId: sheetId,
    resource: {
      requests: [
        {
          sortRange: {
            range: {
              sheetId: 0,
              startRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: 8
            },
            sortSpecs: [
              {
                dimensionIndex: 3,
                sortOrder: 'ASCENDING'
              }
            ]
          }
        }
      ]
    }
  };

  await sheets.spreadsheets.batchUpdate(sortRequest);
}

/**
 * Загружает данные в Google Sheets и сортирует их.
 * @param {string[]} sheetIds - Массив идентификаторов листов.
 * @returns {Promise<void>}
 */
export async function uploadToGoogleSheets(sheetIds) {
  const sheets = await getSheetsClient();
  const data = await fetchData();
  const sheetData = prepareSheetData(data);

  for (const sheetId of sheetIds) {
    try {
      await updateSheet(sheetId, sheetData, sheets);
      await sortSheet(sheetId, sheets);
    } catch (err) {
      console.error(`Ошибка ${sheetId}:`, err);
    }
  }
}

# Wildberries Tariffs Box Service

Этот сервис интегрируется с API Wildberries для получения и накопления данных о тарифах коробов, а также их выгрузки в Google-таблицы.

## Запуск проекта

### 1. Клонирование репозитория

```sh
git clone https://github.com/SGAWP/tariffs-box.git
```

### 2. Создание файла `.env`

Перед запуском создайте в корне проекта файл `.env` со следующим содержимым:

```env
# URL API Wildberries
WB_API_URL=https://common-api.wildberries.ru/api/v1/tariffs/box

# API-ключ Wildberries (укажите свой ключ)
WB_API_KEY=

# Настройки базы данных PostgreSQL
DB_HOST=postgres  # Хост базы данных
DB_PORT=5432      # Порт базы данных
DB_USER=postgres  # Имя пользователя
DB_PASSWORD=postgres  # Пароль
DB_NAME=postgres  # Имя базы данных

# ID Google-таблиц для выгрузки данных (укажите через запятую)
SHEETS_IDS=18ngHblvPXFv7oGYY41PPrUn3LEB4jxBOWA33kZpoG24,1rY7upSuCoAJlOumxUQjl7_XVq9OweawmXwHQlooxrNM
```

### 3. Создание файлов аутентификации Google API

Для работы с Google Sheets необходимо создать в корне проекта два файла: `token.json` и `refresh.json`

## 3.1. Генерация файла token.json
 - Создайте проект в [Google Cloud Console](https://console.cloud.google.com/).
 - Включите Google Sheets API и создайте учетные данные для OAuth 2.0.
 - Скачайте файл с учетными данными и переименуйте его в token.json.
 - Пример содержимого файла token.json:

```json
{
  "web": {
    "client_id": "YOUR_CLIENT_ID",
    "project_id": "YOUR_PROJECT_ID",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "YOUR_CLIENT_SECRET",
    "redirect_uris": ["https://developers.google.com/oauthplayground"]
  }
}
```

Генерация файла refresh.json
- Получите токен доступа, используя [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/).
- Убедитесь, что вы выбрали разрешение для работы с Google Sheets API: https://www.googleapis.com/auth/spreadsheets.
- После получения токена сгенерируйте refresh_token, используя код в ответе.
Пример содержимого файла refresh.json:

```json
{
  "access_token": "YOUR_ACCESS_TOKEN",
  "scope": "https://www.googleapis.com/auth/spreadsheets",
  "token_type": "Bearer",
  "expires_in": 3599,
  "refresh_token": "YOUR_REFRESH_TOKEN"
}
```

### 4. Запуск контейнеров

Для запуска используйте команду:

```sh
docker-compose up
```


# BaseBot.js

![BaseBot](https://i.postimg.cc/vm1s2K8W/basebotjs.png)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
      - [Database configuration](#database-configuration)
- [Development](#development)
  - [Creating a Handler](#creating-a-handler)
  - [Defining a Handler](#defining-a-handler)
- [Usage](#usage)
  - [Initial Setup](#initial-setup)
  - [Running on Linux Server](#running-on-linux-server)
  - [Ensuring Continuous Operation](#ensuring-continuous-operation)
  - [Disconnect from WhatsApp](#disconnect-from-whatsapp)
- [Credits](#credits)
  - [Built with](#built-with)
- [License](#license)

## Overview
BaseBot.js is an advanced WhatsApp bot framework designed for seamless conversation management. This framework empowers developers to create dynamic, stateful WhatsApp bots with ease.

Full documentation is available at [BaseBot.js Documentation](https://liam-mizrahi.gitbook.io/basebot.js/).

## Features
- **Dynamic Conversation Management**
- **Database Integration**
- **Message Handling**
- **Stateful Conversations**
- **Handler System**
- **WhatsApp Integration**

## Getting Started

### Prerequisites
Before diving into BaseBot.js, ensure your development environment meets the following prerequisites:
- Node.js v18 or higher
- MySQL or SQLite3 database
- WhatsApp or WhatsApp Business account
- Machine with 1GB RAM or more (2GB recommended)
- Chromium

### Installation
Install the dependencies.
```bash
npm install
```

### Configuration
Create a `.env` file in the root directory and add the following variables.

```dotenv
APP_ENV=development|production
PORT=3000

# Database
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=whatsappbot
```

If using a local SQLite3 database, the database environment variables are optional.

#### Database configuration
Once the database configuration is set, create the required tables:

```bash
$ npm run migration:run

# For using local sqlite3 database, run:
$ npm run localdb:run
```
If using a different database, update the configuration in the `core/databases/data-source.ts` file.

## Development
BaseBot.js operates on conversation states, each processed by a handler. To create a new handler:

```bash
npm run create:handler <handler-name>
```

### Creating a Handler
Customize and manage your bot's behavior for specific states by creating a new handler using the above command.

### Defining a Handler
```typescript
import { State } from '../decorators/state.decorator';
import { MessageHandler } from '../message-handler.interface';
import { ConversationManager } from '../conversation-manager';

@State('example_state')
export class ExampleStateHandler implements MessageHandler {
  async handleMessage(conversation: ConversationManager): Promise<void> {
    // Implement your handler logic here
    // Called when a message is received in this state
  }

  async onEnterState(conversation: ConversationManager): Promise<void> {
    // Implement your onEnterState logic here
    // Called when entering this state
  }
}
```

## Usage

```bash
$ npm start
```
### Initial Setup
Upon the first run, scan the QR code with your WhatsApp account by visiting http://localhost:3000/connect (replace localhost with the server's IP for remote usage).

After scanning the QR code, the app will start running. Subsequent runs will automatically connect to WhatsApp, even after turning off the phone.

### Running on Linux Server
To run the app on a Linux server, install Chromium:

```bash
# Ubuntu/Debian
sudo apt-get install chromium-browser
sudo apt-get install ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils

# CentOS/RHEL
sudo yum install chromium
```

### Ensuring Continuous Operation

For continuous operation, use [PM2](https://pm2.keymetrics.io/).

```bash
npm install pm2 -g
pm2 start "npm run start" --name "WhatsAppBot"
```

### Disconnect from WhatsApp
WhatsApp's authentication files are stored in these directories:
```text
.wwebjs_auth
.wwebjs_cache
```
To disconnect from WhatsApp, delete these directories.

You can do this by running the following command:
```bash
npm run client:disconnect
```

## Credits
Made by [Liam Mizrahi](https://liammizrahi.com).

### Built with
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/)
- [WhatsApp Web JS](https://wwebjs.dev/)

## License

This project is licensed under the [MIT License](LICENSE).

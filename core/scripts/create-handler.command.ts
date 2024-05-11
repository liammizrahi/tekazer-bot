import * as fs from 'fs';
import * as path from 'path';

function convertToKebabCase(name: string): string {
    return name
        .replace(/[A-Z]/g, (match, offset) => (offset === 0 ? '' : '-') + match.toLowerCase())
        .replace(/-|_/g, '-');
}

function convertToPascalCase(name: string): string {
    return name
        .split(/-|_/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}

const handlerName = process.argv[2];

if (!handlerName) {
    console.error('Please provide a handler name.');
    process.exit(1);
}

// Convert handler name to kebab-case
const kebabCaseHandlerName = convertToKebabCase(handlerName);

// Convert handler name to PascalCase
const pascalCaseHandlerName = convertToPascalCase(kebabCaseHandlerName);

// Convert kebab-case to snake_case for state name
const snakeCaseStateName = kebabCaseHandlerName.replace(/-/g, '_');

// Create handler file path
const handlerFileName = `${kebabCaseHandlerName}.handler.ts`;
const handlerFilePath = path.join(__dirname, '../../', 'src', 'handlers', handlerFileName);

// Check if the handler file already exists
if (fs.existsSync(handlerFilePath)) {
    console.error(`Handler file "${handlerFileName}" already exists.`);
    process.exit(1);
}

// Handler template
const handlerTemplate = `
import { State } from '@core/decorators';
import { MessageHandler, ConversationManager } from '@core/conversation';

@State('${snakeCaseStateName}_state')
export class ${pascalCaseHandlerName}Handler implements MessageHandler {
    async handleMessage(conversation: ConversationManager): Promise<void> {
        // Implement your handler logic here
        console.log(conversation.message.body);
    }
    
    async onEnterState(conversation: ConversationManager): Promise<void> {
        // Implement your onEnterState logic here
        console.log('Entering ${pascalCaseHandlerName} state');
    }
}
`;

// Write the handler template to the file
fs.writeFileSync(handlerFilePath, handlerTemplate.trim());

console.log(`Handler "${handlerFileName}" created successfully.`);

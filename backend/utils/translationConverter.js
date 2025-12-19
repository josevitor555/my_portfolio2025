// Utility to convert TypeScript translations to JavaScript format
// This file converts the translations from the frontend to a format usable in the backend

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to extract translations from the TypeScript file
function extractTranslationsFromFile(filePath) {
  try {
    // Read the TypeScript file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract the translations object using regex
    const translationsMatch = fileContent.match(/export const translations: TranslationData = \{([\s\S]*?)\};/);
    
    if (!translationsMatch) {
      throw new Error('Could not find translations object in file');
    }
    
    // Return the extracted content
    return translationsMatch[1];
  } catch (error) {
    console.error('Error extracting translations:', error);
    return null;
  }
}

// Function to convert TypeScript object to JavaScript object
function convertToObject(translationsString) {
  // This is a simplified parser - in a real-world scenario, you might want to use a proper parser
  // For now, we'll create a basic conversion
  
  // Create a basic structure
  const translations = {};
  
  // Split by sections (comments)
  const sections = translationsString.split('// ');
  
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    const lines = section.split('\n').filter(line => line.trim() !== '');
    
    // Skip the section title (first line)
    for (let j = 1; j < lines.length; j++) {
      const line = lines[j].trim();
      
      // Match translation entries
      const match = line.match(/^'([^']+)': {\s*pt: '([^']*)',\s*en: '([^']*)'\s*},?$/);
      if (match) {
        const key = match[1];
        const pt = match[2].replace(/\\'/g, "'");
        const en = match[3].replace(/\\'/g, "'");
        
        translations[key] = { pt, en };
      }
    }
  }
  
  return translations;
}

// Function to generate chat context from translations
function generateChatContext(translations) {
  let context = "";
  
  // Add banner information
  context += "PORTFOLIO INFORMATION:\n";
  context += "=====================\n\n";
  
  context += `Name: ${translations['banner.name']?.pt || 'José Vitor'}\n`;
  context += `Description: ${translations['banner.description']?.pt || 'Senior Web Developer'}\n\n`;
  
  // Add about information
  context += "ABOUT ME:\n";
  context += "---------\n";
  context += `${translations['about.description1']?.pt || ''}\n`;
  context += `${translations['about.description2']?.pt || ''}\n\n`;
  
  // Add skills information
  context += "SKILLS:\n";
  context += "------\n";
  context += `- ${translations['skills.frontend.title']?.pt || 'Frontend Development'}: ${translations['skills.frontend.description']?.pt || ''}\n`;
  context += `- ${translations['skills.backend.title']?.pt || 'Backend Development'}: ${translations['skills.backend.description']?.pt || ''}\n`;
  context += `- ${translations['skills.figma.title']?.pt || 'Figma Designs'}: ${translations['skills.figma.description']?.pt || ''}\n`;
  context += `- ${translations['skills.ai.title']?.pt || 'AI Development'}: ${translations['skills.ai.description']?.pt || ''}\n\n`;
  
  // Add projects information
  context += "PROJECTS SECTION:\n";
  context += "----------------\n";
  context += `${translations['projects.subtitle']?.pt || ''}\n\n`;
  
  // Add experience information
  context += "EXPERIENCE:\n";
  context += "----------\n";
  context += `${translations['experience.subtitle']?.pt || ''}\n\n`;
  
  // Add contact information
  context += "CONTACT:\n";
  context += "-------\n";
  context += `${translations['contact.subtitle']?.pt || ''}\n\n`;
  
  return context;
}

// Main function to process translations
function processTranslations() {
  try {
    // Path to the translations file in the frontend
    const translationsPath = path.join(__dirname, '../../my-portfolio/src/data/translations.ts');    
    // Extract translations
    const translationsString = extractTranslationsFromFile(translationsPath);
    
    if (!translationsString) {
      throw new Error('Failed to extract translations');
    }
    
    // Convert to object
    const translations = convertToObject(translationsString);
    
    // Generate chat context
    const chatContext = generateChatContext(translations);
    
    // Save the context to a file that can be imported by chatHistory.js
    const outputPath = path.join(__dirname, '../generated/chatContext.js');
    const outputDir = path.dirname(outputPath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write the context to a file
    fs.writeFileSync(outputPath, `export const chatContext = \`${chatContext}\`;`, 'utf8');
    
    console.log('Translations processed successfully!');
    console.log('Chat context saved to:', outputPath);
    
    return chatContext;
  } catch (error) {
    console.error('Error processing translations:', error);
    return null;
  }
}

// Export functions
export { processTranslations, extractTranslationsFromFile, convertToObject, generateChatContext };

// Run the process if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  processTranslations();
}
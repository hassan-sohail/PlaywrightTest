import fs from 'fs';
import path from 'path';

// Path where the campaign name will be stored
const filePath = path.join(__dirname, '..', 'campaign-data.json');

/**
 * Generates a unique campaign name and saves it to campaign-data.json
 */
export function generateCampaignName(): string {
  const name = `AutomatedCampaign_${Date.now()}`;
  fs.writeFileSync(filePath, JSON.stringify({ campaignName: name }));
  return name;
}

/**
 * Reads the saved campaign name from campaign-data.json
 */
export function getSavedCampaignName(): string {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data).campaignName;
}

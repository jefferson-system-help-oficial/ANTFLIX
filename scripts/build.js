const fs = require('fs');
const path = require('path');

const SITES_DIR = path.join(__dirname, '..', 'sites');
const OUTPUT_FILE = path.join(__dirname, '..', 'sites.json');

function main() {
  try {
    // 1. Read metadata.json
    const metadataPath = path.join(SITES_DIR, 'metadata.json');
    if (!fs.existsSync(metadataPath)) {
      throw new Error(`Metadata file not found at ${metadataPath}`);
    }
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

    // 2. Read all json files in sites/ directory excluding metadata.json
    const files = fs.readdirSync(SITES_DIR);
    const sites = [];

    for (const file of files) {
      if (file === 'metadata.json') continue;
      if (!file.endsWith('.json')) continue;

      const filepath = path.join(SITES_DIR, file);
      const content = fs.readFileSync(filepath, 'utf8');

      let siteData;
      try {
        siteData = JSON.parse(content);
      } catch (err) {
        throw new Error(`Error parsing JSON in file ${file}: ${err.message}`);
      }

      // Basic validation
      const requiredFields = ['id', 'name', 'url', 'enabled', 'category'];
      for (const field of requiredFields) {
        if (siteData[field] === undefined) {
          throw new Error(`Missing required field '${field}' in site file: ${file}`);
        }
      }

      // Add "source" field so consumers know exactly where this site's source file is
      siteData.source = `sites/${file}`;

      sites.push(siteData);
    }

    // 3. Keep original sorting order or structure: we can sort them stably, e.g. first by the exact order of the original sites or by id/category
    const categoryOrder = {
      "Anime Dublado": 1,
      "Filmes e Séries": 2
    };

    sites.sort((a, b) => {
      const orderA = categoryOrder[a.category] || 99;
      const orderB = categoryOrder[b.category] || 99;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return a.id.localeCompare(b.id);
    });

    // 4. Construct final sites.json structure
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD

    const outputData = {
      version: metadata.version,
      updated: formattedDate,
      sites: sites
    };

    // 5. Write to sites.json at root
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2) + '\n', 'utf8');
    console.log(`Successfully compiled ${sites.length} sites into ${OUTPUT_FILE}`);
    console.log(`Version: ${metadata.version}`);
    console.log(`Updated: ${formattedDate}`);

  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

main();

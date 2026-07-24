const fs = require('fs');
const path = require('path');

const SITES_DIR = path.join(__dirname, '..', 'sites');
const OUTPUT_FILE = path.join(__dirname, '..', 'sites.json');

// Subdirectories we want to scan under sites/
const SUB_DIRS = ['animes', 'filmes', 'tv', 'adultos'];

function main() {
  try {
    // 1. Read metadata.json
    const metadataPath = path.join(SITES_DIR, 'metadata.json');
    if (!fs.existsSync(metadataPath)) {
      throw new Error(`Metadata file not found at ${metadataPath}`);
    }
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

    // 2. Read all json files in specified subdirectories under sites/
    const sites = [];

    for (const subDir of SUB_DIRS) {
      const fullSubDirPath = path.join(SITES_DIR, subDir);
      if (!fs.existsSync(fullSubDirPath)) {
        continue; // Skip if directory does not exist yet
      }

      const files = fs.readdirSync(fullSubDirPath);
      for (const file of files) {
        if (!file.endsWith('.json')) continue;

        const filepath = path.join(fullSubDirPath, file);
        const content = fs.readFileSync(filepath, 'utf8');

        let siteData;
        try {
          siteData = JSON.parse(content);
        } catch (err) {
          throw new Error(`Error parsing JSON in file ${subDir}/${file}: ${err.message}`);
        }

        // Basic validation
        const requiredFields = ['id', 'name', 'url', 'enabled', 'category'];
        for (const field of requiredFields) {
          if (siteData[field] === undefined) {
            throw new Error(`Missing required field '${field}' in site file: ${subDir}/${file}`);
          }
        }

        // Add "source" field pointing to the correct subfolder
        siteData.source = `sites/${subDir}/${file}`;

        sites.push(siteData);
      }
    }

    // 3. Sorting order based on category
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

export default function(eleventyConfig) {
  // Set input and output directories
  eleventyConfig.setDataDeepMerge(true);
  
  // Add date filters for feed formatting
  eleventyConfig.addFilter("date", (date, format) => {
    if (!date) return new Date().toISOString();
    
    // Parse the WarCom date format "10 Aug 25" -> "10 Aug 2025"
    let dateStr = date;
    if (typeof date === 'string' && /^\d{1,2}\s+\w+\s+\d{2}$/.test(date.trim())) {
      const parts = date.trim().split(/\s+/);
      dateStr = `${parts[0]} ${parts[1]} 20${parts[2]}`;
    }
    
    const d = new Date(dateStr);
    
    switch(format) {
      case '%a, %d %b %Y %H:%M:%S %z':
        // RSS format
        return d.toUTCString().replace('GMT', '+0000');
      case '%Y-%m-%dT%H:%M:%S%z':
        // ISO format for Atom
        return d.toISOString();
      default:
        return d.toISOString();
    }
  });

  // Add head filter to limit array length
  eleventyConfig.addFilter("head", (array, count = 10) => {
    return Array.isArray(array) ? array.slice(0, count) : [];
  });

  // Configure input/output directories
  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
}
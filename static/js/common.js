const jsonFilePath = "storage/code.json"; // Ensure the path is correct

// Function to Load JSON Data
async function loadCodeEntries(callback) {
    try {
        console.log("Fetching JSON from:", jsonFilePath);
        const response = await fetch(jsonFilePath);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Loaded JSON Data:", data);
        callback(data);
    } catch (error) {
        console.error("❌ Error loading JSON:", error);
        alert("⚠️ Error loading JSON! Check console for details.");
    }
}

// Wir importieren die benötigten Module
import inquirer from 'inquirer'; // Für Eingaben im Terminal
import qr from 'qr-image';       // Zum Erstellen von QR-Codes
import fs from 'fs';             // Zum Arbeiten mit Dateien

// Mit inquirer stellen wir dem Benutzer eine Frage
inquirer
  .prompt([
    {
      message: "Gib deine URL ein:", // Die Frage, die im Terminal erscheint
      name: "URL",                   // Der Schlüsselname für die Antwort
    },
  ])
  .then((answers) => {
    // answers ist ein Objekt mit allen Eingaben des Benutzers
    const url = answers.URL; // Wir holen die URL aus den Antworten

    // Einen QR-Code aus der URL erzeugen (als PNG)
    var qr_svg = qr.image(url);

    // Den QR-Code in eine Datei speichern
    qr_svg.pipe(fs.createWriteStream('qr-code-image.png'));

    // Zusätzlich die eingegebene URL in einer Textdatei speichern
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("✅ Die URL wurde gespeichert!");
    });

  })
  .catch((error) => {
    // Falls ein Fehler auftritt:
    if (error.isTtyError) {
      // Wenn das Terminal die Frage nicht anzeigen kann
      console.log("❌ Fehler: Das Terminal unterstützt die Eingabe nicht.");
    } else {
      // Irgendein anderer Fehler
      console.log("❌ Ein unerwarteter Fehler ist aufgetreten.");
    }
  });

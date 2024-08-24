import React, { useState } from "react";
import QRCode from "qrcode.react";
import { BrowserMultiFormatReader } from '@zxing/library';

function App() {
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [scanResult, setScanResult] = useState(null);

  const handleGenerateQR = () => {
    setQrValue(text);
  };

  const handleScan = (event) => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader.decodeFromVideoDevice(null, 'video', (result, error) => {
      if (result) {
        setScanResult(result.text);
      }
      if (error) {
        console.log(error);
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Generar y Leer Códigos QR</h1>

      <div>
        <h2>Generar Código QR</h2>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ingresa el texto"
        />
        <button onClick={handleGenerateQR}>Generar QR</button>
        <div style={{ marginTop: "20px" }}>
          <QRCode value={qrValue} size={200} />
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Leer Código QR</h2>
        <video id="video" style={{ width: "100%" }}></video>
        {scanResult && (
          <div style={{ marginTop: "20px" }}>
            <strong>Resultado:</strong> {scanResult}
          </div>
        )}
        <button onClick={handleScan}>Iniciar Lectura QR</button>
      </div>
    </div>
  );
}

export default App;

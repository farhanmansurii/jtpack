import React, { useState, useRef } from "react";
import { MapPin, Copy, Check, Info } from "lucide-react";

export default function PinPositionFinder() {
  const [positions, setPositions] = useState([]);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);
  const [currentName, setCurrentName] = useState("");
  const [showCoords, setShowCoords] = useState(false);
  const [hoverCoords, setHoverCoords] = useState({ x: 0, y: 0 });
  const [svgUrl, setSvgUrl] = useState("/hero/india.svg"); // Update this to your actual path

  const handleMapClick = (e) => {
    if (!currentName.trim()) {
      alert("Please enter a location name first!");
      return;
    }

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Get click position relative to container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentage of total container (including padding area)
    const leftPct = ((x / rect.width) * 100).toFixed(2);
    const topPct = ((y / rect.height) * 100).toFixed(2);

    setPositions([
      ...positions,
      {
        id: Date.now(),
        name: currentName,
        leftPct: parseFloat(leftPct),
        topPct: parseFloat(topPct),
      },
    ]);
    setCurrentName("");
  };

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const leftPct = ((x / rect.width) * 100).toFixed(2);
    const topPct = ((y / rect.height) * 100).toFixed(2);
    setHoverCoords({ x: leftPct, y: topPct });
  };

  const copyToClipboard = () => {
    const code = positions
      .map(
        (p) =>
          `{
  id: "${p.name.toLowerCase().replace(/\s+/g, "-")}",
  name: "${p.name}",
  state: "State Name",
  leftPct: ${p.leftPct},
  topPct: ${p.topPct},
  category: "plant", // or "hq" or "other"
  label: "Your Label",
  address: "Full address here",
},`,
      )
      .join("\n");

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const removePin = (id) => {
    setPositions(positions.filter((p) => p.id !== id));
  };

  const clearAll = () => {
    setPositions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 border border-slate-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Pin Position Finder</h1>
              <p className="text-slate-600">
                Click on the map to get accurate coordinates for your pins
              </p>
            </div>
          </div>

          {/* SVG URL Input */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Map SVG URL (optional - defaults to India map)
            </label>
            <input
              type="text"
              value={svgUrl}
              onChange={(e) => setSvgUrl(e.target.value)}
              placeholder="Enter your SVG URL or leave default"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-mono"
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              <h3 className="font-bold text-blue-900">Enter Location Name</h3>
            </div>
            <input
              type="text"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              placeholder="e.g., Mumbai, Delhi, Bangalore..."
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              onKeyPress={(e) => e.key === "Enter" && currentName && setShowCoords(true)}
            />
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              <h3 className="font-bold text-purple-900">Click on the Map</h3>
            </div>
            <p className="text-sm text-purple-800">
              Click precisely where you want the pin. Hover to see live coordinates.
            </p>
            {showCoords && (
              <div className="mt-2 bg-purple-900 text-purple-100 px-3 py-2 rounded-lg text-xs font-mono">
                Hover: {hoverCoords.x}%, {hoverCoords.y}%
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Map Area */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-slate-900">Interactive Map</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCoords(!showCoords)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    showCoords
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {showCoords ? "Hide Coords" : "Show Coords"}
                </button>
              </div>
            </div>

            <div
              ref={containerRef}
              onClick={handleMapClick}
              onMouseMove={showCoords ? handleMouseMove : null}
              className="relative w-full aspect-[16/10] rounded-xl bg-slate-50 border-4 border-indigo-200 cursor-crosshair hover:border-indigo-400 transition-all shadow-inner"
              style={{ position: "relative", overflow: "visible" }}
            >
              {/* The actual map rendering area with padding */}
              <div className="absolute inset-0 p-6 z-0">
                <div
                  className="h-full w-full bg-blue-200 dark:bg-slate-300"
                  style={{
                    minHeight: "100%",
                    minWidth: "100%",
                    WebkitMaskImage: `url(${svgUrl})`,
                    maskImage: `url(${svgUrl})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                />
              </div>

              {/* Placed pins - using absolute positioning relative to container */}
              {positions.map((pos) => (
                <div
                  key={pos.id}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${pos.leftPct}%`,
                    top: `${pos.topPct}%`,
                    zIndex: 50,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
                    }}
                  >
                    <path
                      d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
                      fill="#dc2626"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <div
                    className="absolute top-full left-0 translate-x-3 mt-1 bg-slate-900 text-white px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap shadow-lg"
                  >
                    {pos.name}
                  </div>
                </div>
              ))}

              {positions.length === 0 && !currentName && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center text-slate-400">
                    <MapPin className="w-16 h-16 mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-semibold">Enter a name, then click to place pins</p>
                  </div>
                </div>
              )}

              {currentName && positions.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
                      <p className="text-sm font-semibold">
                        Click anywhere to place "{currentName}"
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex gap-2 text-xs text-amber-900">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  <strong>Important:</strong> Pins are positioned relative to the entire container
                  (including padding). This matches exactly how your component works.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pins List */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-900">
                  Pins Placed
                  <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">
                    {positions.length}
                  </span>
                </h3>
                {positions.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-rose-600 hover:text-rose-700 font-semibold hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {positions.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-500 italic">No pins placed yet</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[350px] overflow-y-auto">
                  {positions.map((pos, index) => (
                    <div
                      key={pos.id}
                      className="flex items-start justify-between gap-3 p-3 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 hover:border-indigo-300 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                            {index + 1}
                          </span>
                          <div className="font-semibold text-sm text-slate-900 truncate">
                            {pos.name}
                          </div>
                        </div>
                        <div className="text-xs text-slate-600 font-mono bg-white px-2 py-1 rounded border border-slate-200 inline-block">
                          L: {pos.leftPct}% • T: {pos.topPct}%
                        </div>
                      </div>
                      <button
                        onClick={() => removePin(pos.id)}
                        className="text-rose-500 hover:text-rose-700 text-xs font-semibold px-2 py-1 rounded hover:bg-rose-50 transition-colors shrink-0"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Export Code */}
            {positions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-slate-900">Export Code</h3>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto max-h-[280px] overflow-y-auto shadow-inner">
                  <pre className="text-xs text-green-400 font-mono leading-relaxed">
                    {positions
                      .map(
                        (p) =>
                          `{
  id: "${p.name.toLowerCase().replace(/\s+/g, "-")}",
  name: "${p.name}",
  state: "State Name",
  leftPct: ${p.leftPct},
  topPct: ${p.topPct},
  category: "plant",
  label: "Label",
  address: "Address",
},`,
                      )
                      .join("\n")}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
          <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Pro Tips for Accurate Placement
          </h3>
          <ul className="text-sm text-green-800 space-y-2 grid md:grid-cols-2 gap-x-8">
            <li className="flex gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span>Coordinates include the padding area automatically</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span>Hover with "Show Coords" to preview before clicking</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span>Click precisely on the city/state location</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span>Copy and paste directly into your locations array</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

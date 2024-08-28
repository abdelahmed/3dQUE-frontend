import React, { useState } from 'react';
import { Button, TextInput, Label } from 'flowbite-react';
import FilamentGauge from './FilamentGauge'; // Import the FilamentGauge component

const FilamentPopover = () => {
  // State to manage filament values
  const [filamentTotal, setFilamentTotal] = useState(1000);
  const [filamentCurr, setFilamentCurr] = useState(500);
  const [isEditing, setIsEditing] = useState(false);
  const [newTotal, setNewTotal] = useState(filamentTotal);
  const [newCurrent, setNewCurrent] = useState(filamentCurr);

  // Handler for Edit/Save button
  const handleEdit = () => {
    if (isEditing) {
      // Save changes with validation
      const updatedTotal = newCurrent > newTotal ? newCurrent : newTotal;
      setFilamentTotal(updatedTotal);
      setFilamentCurr(newCurrent);
      // Also update the `newTotal` and `newCurrent` to reflect the saved state
      setNewTotal(updatedTotal);
      setNewCurrent(newCurrent);
    }
    // Toggle edit mode
    setIsEditing(!isEditing);
  };

  // Handler for Refill options
  const handleRefill = (amount) => {
    const refillAmount = amount * 1000; // Convert kg to grams
    // Update filament total and current based on refill
    const newTotalValue = filamentCurr + refillAmount;
    setFilamentTotal(newTotalValue);
    setFilamentCurr(newTotalValue);

    // If in edit mode, also update the new values
    if (isEditing) {
      setNewTotal(newTotalValue);
      setNewCurrent(newTotalValue);
    } else {
      // Update `newTotal` and `newCurrent` to match the new state if not editing
      setNewTotal(newTotalValue);
      setNewCurrent(newTotalValue);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] h-[400px] p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold mr-10">Filament Quick Controls</h2>
        </div>
        <div className="flex items-center justify-between mb-4">
        <p className='ml-10'>{filamentCurr} / {filamentTotal} grams</p>
      </div>


        <div className="flex flex-col h-full">
          {/* Second row: Filament gauge and form */}
          <div className="flex flex-row flex-grow mb-4">
            {/* Left side: Filament gauge */}
            <div className="w-1/2 flex flex-col justify-center items-center p-2">
              <FilamentGauge
                filament_total={filamentTotal}
                filament_curr={filamentCurr}
              />
            </div>

            {/* Right side: Form */}
            <div className="w-1/2 flex flex-col p-2">
              <div className="mb-4">
                <Label htmlFor="filament-remaining">Filament Remaining (grams)</Label>
                <TextInput
                  id="filament-remaining"
                  type="number"
                  value={isEditing ? (newCurrent || '') : filamentCurr}
                  onChange={(e) => setNewCurrent(Number(e.target.value) || '')}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  style={{ 
                    WebkitAppearance: 'none', // Chrome/Safari
                    MozAppearance: 'textfield', // Firefox
                    appearance: 'none' // Other browsers
                  }}
                />
              </div>
            </div>
          </div>

          {/* Third row: Refill options */}
          <div className="flex flex-col mb-4">
            <h3 className="text-lg font-semibold mb-2">Refill Options</h3>
            <div className="flex flex-wrap gap-2">
              <Button color="gray" onClick={() => handleRefill(0.75)}>0.75kg</Button>
              <Button color="gray" onClick={() => handleRefill(1)}>1kg</Button>
              <Button color="gray" onClick={() => handleRefill(5)}>5kg</Button>
              <Button color="gray" onClick={() => handleRefill(10)}>10kg</Button>
            </div>
          </div>

          {/* Fourth row: Edit/Save button */}
          <div className="flex justify-center mt-4">
            <Button onClick={handleEdit}>
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilamentPopover;

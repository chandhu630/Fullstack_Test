import { useState } from "react";

const FloorTable = () => {
  const [floors, setFloors] = useState([
    { id: -1, description: "", type: "", isFixed: true, isEditable: true }, // Initial floor (-1), cannot be deleted
  ]);

  const floorTypes = ["Washroom", "Kitchen", "Toilet", "Corner Room"];

  // Find the next available floor number (starting from 0)
  const getNextFloorNumber = () => {
    const existingIds = floors.map(floor => floor.id);
    let newId = 0;
    while (existingIds.includes(newId)) {
      newId++;
    }
    return newId;
  };

  // Ensure the last floor is completely filled before allowing new creation
  const isLastFloorFilled = () => {
    const lastFloor = floors[floors.length - 1];
    return lastFloor.description.trim() !== "" && lastFloor.type !== "";
  };

  // Add a new floor row only if the last one is fully filled
  const addFloor = () => {
    if (!isLastFloorFilled()) {
      alert("Please fill all details before adding a new floor.");
      return;
    }

    const newFloor = {
      id: getNextFloorNumber(),
      description: "",
      type: "",
      isFixed: false,
      isEditable: true,
    };

    setFloors([...floors, newFloor]);
  };

  // Delete a floor and renumber the remaining floors
  const deleteFloor = (id) => {
    const updatedFloors = floors
      .filter(floor => floor.id !== id)
      .map((floor, index) => ({
        ...floor,
        id: index - 1, // Renumber floors starting from 0
      }));

    setFloors(updatedFloors);
  };

  // Handle input changes (only when editable)
  const handleInputChange = (id, field, value) => {
    setFloors(
      floors.map(floor =>
        floor.id === id && floor.isEditable ? { ...floor, [field]: value } : floor
      )
    );
  };

  // Save the floor (disable editing only if all fields are filled)
  const saveFloor = (id) => {
    const floor = floors.find(f => f.id === id);
    if (!floor.description.trim() || !floor.type) {
      alert("Please fill all fields before saving.");
      return;
    }

    setFloors(
      floors.map(floor =>
        floor.id === id ? { ...floor, isEditable: false } : floor
      )
    );
  };

  return (
    <div className="container">
      <h2>Floor Management</h2>

      <table className="floor-table">
        <thead>
          <tr>
            <th>Floor</th>
            <th>Description</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {floors.map(floor => (
            <tr key={floor.id}>
              <td>{floor.id}</td>
              <td>
                <input
                  type="text"
                  value={floor.description}
                  onChange={(e) =>
                    handleInputChange(floor.id, "description", e.target.value)
                  }
                  disabled={!floor.isEditable}
                />
              </td>
              <td>
                <select
                  value={floor.type}
                  onChange={(e) =>
                    handleInputChange(floor.id, "type", e.target.value)
                  }
                  disabled={!floor.isEditable}
                >
                  <option value="">Select</option>
                  {floorTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                {floor.isEditable && (
                  <button className="save-btn" onClick={() => saveFloor(floor.id)}>
                    Save
                  </button>
                )}
                {!floor.isFixed && (
                  <button className="delete-btn" onClick={() => deleteFloor(floor.id)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="create-btn" onClick={addFloor}>
        Create Floor
      </button>

      {/* Styles */}
      <style>{`
        .container {
          width: 50%;
          margin: auto;
          text-align: center;
        }
        .floor-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }
        input, select {
          padding: 5px;
          width: 100%;
        }
        .create-btn, .delete-btn, .save-btn {
          margin-top: 10px;
          padding: 8px 12px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        .create-btn {
          background-color: green;
          color: white;
        }
        .save-btn {
          background-color: blue;
          color: white;
        }
        .delete-btn {
          background-color: red;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default FloorTable;

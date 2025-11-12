"use client";

import React, { useState } from "react";

export default function DynamicForm() {
  const [fields, setFields] = useState([
    { id: 1, label: "Full Name", name: "name", type: "text", value: "" },
    { id: 2, label: "Email", name: "email", type: "email", value: "" },
    { id: 3, label: "Age", name: "age", type: "number", value: "" },
    { 
      id: 4, 
      label: "Role", 
      name: "role", 
      type: "select", 
      options: ["Developer", "Designer", "Manager"], 
      value: "" 
    },
  ]);

  const [formData, setFormData] = useState({});
  const [newField, setNewField] = useState({
    label: "",
    name: "",
    type: "text",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const addField = () => {
    if (!newField.label || !newField.name) return alert("Please fill both fields");

    const id = Date.now();
    setFields([...fields, { id, ...newField, value: "" }]);
    setNewField({ label: "", name: "", type: "text" });
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Check console for submitted data!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Dynamic Input Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.id}>
              <label className="block mb-1 font-medium">{field.label}</label>

              {field.type === "select" ? (
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  onChange={(e) => handleChange(field.name, e.target.value)}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={`Enter ${field.label}`}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                />
              )}

              <button
                type="button"
                onClick={() => removeField(field.id)}
                className="text-sm text-red-600 mt-1 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>

        <div className="mt-8 border-t pt-4">
          <h3 className="font-semibold mb-2">Add New Input</h3>

          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Label (e.g. Address)"
              value={newField.label}
              onChange={(e) =>
                setNewField({ ...newField, label: e.target.value })
              }
              className="border px-3 py-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="Name (e.g. address)"
              value={newField.name}
              onChange={(e) =>
                setNewField({ ...newField, name: e.target.value })
              }
              className="border px-3 py-2 rounded-lg"
            />

            <select
              value={newField.type}
              onChange={(e) =>
                setNewField({ ...newField, type: e.target.value })
              }
              className="border px-3 py-2 rounded-lg"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
              <option value="select">Select</option>
            </select>

            <button
              onClick={addField}
              className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              + Add Field
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

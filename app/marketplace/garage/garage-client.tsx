"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Bike, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useGarage } from "@/components/marketplace/garage-provider";
import { BIKE_BRANDS, type BikeBrand } from "@/lib/marketplace/types";
import { BIKE_MODELS_BY_BRAND, YEAR_OPTIONS } from "@/lib/marketplace/data/bikes";

export function GarageClient() {
  const { vehicles, activeVehicle, addVehicle, removeVehicle, setActiveVehicleId, ready } = useGarage();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (ready && vehicles.length === 0) setShowForm(true);
  }, [ready, vehicles.length]);
  const [brand, setBrand] = useState<BikeBrand>("BMW Motorrad");
  const [model, setModel] = useState(BIKE_MODELS_BY_BRAND["BMW Motorrad"][0]);
  const [year, setYear] = useState(YEAR_OPTIONS[0]);
  const [color, setColor] = useState("");
  const [vin, setVin] = useState("");
  const [mods, setMods] = useState("");

  function handleBrandChange(next: BikeBrand) {
    setBrand(next);
    setModel(BIKE_MODELS_BY_BRAND[next][0]);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    addVehicle({ brand, model, year, color: color || undefined, vin: vin || undefined, mods: mods || undefined });
    setColor("");
    setVin("");
    setMods("");
    setShowForm(false);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col gap-4">
        {vehicles.length === 0 && (
          <p className="text-sm text-foreground-muted">Your garage is empty — add your first bike to start seeing parts that fit.</p>
        )}
        {vehicles.map((v) => (
          <div
            key={v.id}
            className={`flex items-center justify-between gap-4 rounded-md border p-5 transition-colors ${
              activeVehicle?.id === v.id ? "border-accent/50 bg-accent/5" : "border-border bg-surface"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                <Bike className="h-5 w-5 text-accent" />
              </span>
              <div>
                <p className="font-display text-base font-bold">
                  {v.brand} {v.model}
                </p>
                <p className="text-xs text-foreground-muted">
                  {v.year}
                  {v.color ? ` · ${v.color}` : ""}
                  {v.mods ? ` · ${v.mods}` : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeVehicle?.id === v.id ? (
                <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest2 text-accent">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Active
                </span>
              ) : (
                <button
                  onClick={() => setActiveVehicleId(v.id)}
                  className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted hover:text-accent"
                >
                  Set active
                </button>
              )}
              <button
                onClick={() => removeVehicle(v.id)}
                aria-label={`Remove ${v.brand} ${v.model}`}
                className="text-foreground-muted transition-colors hover:text-racing"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {!showForm && (
          <Button variant="outline" onClick={() => setShowForm(true)} className="mt-2">
            <Plus className="h-4 w-4" /> Add a Vehicle
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-md border border-border bg-surface p-6 h-fit">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Select id="brand" value={brand} onChange={(e) => handleBrandChange(e.target.value as BikeBrand)}>
                {BIKE_BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Select id="model" value={model} onChange={(e) => setModel(e.target.value)}>
                {BIKE_MODELS_BY_BRAND[brand].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="year">Year</Label>
              <Select id="year" value={year} onChange={(e) => setYear(Number(e.target.value))}>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Input id="color" value={color} onChange={(e) => setColor(e.target.value)} placeholder="e.g. Racing Red" />
            </div>
          </div>
          <div>
            <Label htmlFor="vin">VIN (optional)</Label>
            <Input id="vin" value={vin} onChange={(e) => setVin(e.target.value)} placeholder="Chassis / VIN number" />
          </div>
          <div>
            <Label htmlFor="mods">Current modifications</Label>
            <Input id="mods" value={mods} onChange={(e) => setMods(e.target.value)} placeholder="e.g. Akra full system, frame sliders" />
          </div>
          <div className="flex gap-3">
            <Button type="submit" variant="primary" className="flex-1">
              Save Vehicle
            </Button>
            {vehicles.length > 0 && (
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

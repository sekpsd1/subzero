"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import styles from "./ContinuingEducationPageContent.module.css";

const representativeTypes = [
  "Builder/Developer Representative",
  "Design Professional Representative",
  "Remodeler/Contractor Representative",
] as const;

export function RepresentativeSearchForm() {
  const [representativeType, setRepresentativeType] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [typeError, setTypeError] = useState("");
  const [zipError, setZipError] = useState("");
  const [status, setStatus] = useState("");

  function validateAndSearch() {
    const nextTypeError = representativeType
      ? ""
      : "Select a representative type.";
    const nextZipError = /^\d{5}$/.test(zipCode)
      ? ""
      : "Enter a valid 5-digit ZIP Code.";

    setTypeError(nextTypeError);
    setZipError(nextZipError);
    setStatus("");

    if (nextTypeError || nextZipError) return;

    setStatus(
      "Representative search is currently unavailable. Please contact Customer Care at 800-222-7820.",
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    validateAndSearch();
  }

  function handleZipKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    validateAndSearch();
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit} noValidate>
      <fieldset
        className={styles.radioGroup}
        aria-describedby={typeError ? "representative-type-error" : undefined}
      >
        <legend className={styles.visuallyHidden}>I am searching for a</legend>
        <div className={styles.radioOptions}>
          {representativeTypes.map((type) => (
            <label className={styles.radioLabel} key={type}>
              <input
                type="radio"
                name="representative-type"
                value={type}
                checked={representativeType === type}
                onChange={(event) => {
                  setRepresentativeType(event.target.value);
                  setTypeError("");
                  setStatus("");
                }}
              />
              <span aria-hidden="true" className={styles.radioControl} />
              <span>{type}</span>
            </label>
          ))}
        </div>
        <p
          className={styles.fieldMessage}
          id="representative-type-error"
          role={typeError ? "alert" : undefined}
        >
          {typeError}
        </p>
      </fieldset>

      <div className={styles.searchRow}>
        <div className={styles.zipField}>
          <label className={styles.visuallyHidden} htmlFor="representative-zip">
            ZIP Code
          </label>
          <div className={styles.inputWrap}>
            <input
              id="representative-zip"
              className={styles.zipInput}
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder="Zip Code"
              value={zipCode}
              aria-invalid={Boolean(zipError)}
              aria-describedby={zipError ? "zip-code-error" : undefined}
              onChange={(event) => {
                setZipCode(event.target.value.replace(/\D/g, "").slice(0, 5));
                setZipError("");
                setStatus("");
              }}
              onKeyDown={handleZipKeyDown}
            />
            {zipCode ? (
              <button
                className={styles.clearButton}
                type="button"
                aria-label="Clear ZIP Code"
                onClick={() => {
                  setZipCode("");
                  setZipError("");
                  setStatus("");
                }}
              >
                <span aria-hidden="true" />
              </button>
            ) : null}
          </div>
          <p className={styles.fieldMessage} id="zip-code-error" role={zipError ? "alert" : undefined}>
            {zipError}
          </p>
        </div>

        <button className={styles.submitButton} type="submit">
          Find Your Representative
        </button>
      </div>

      <p className={styles.formStatus} aria-live="polite">
        {status}
      </p>
    </form>
  );
}

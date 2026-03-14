/**
 * Settings feature type definitions
 */

/** Available sections in the settings page */
export type SettingsSection = "account" | "appearance" | "language" | "danger"

/** Result type returned by settings service functions */
export type ServiceResult = {
    success: boolean
    error?: string
}

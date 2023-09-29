import { chemotionElnHostname } from "./config"
// Set chemotionElnHostname to the running instance of your ELN server.
export const apiHostname = chemotionElnHostname
export const apiBasePath = `${apiHostname}/api/v1/reaction_process_editor`

export const afterSignInPath = "/reactions"
export const afterSignOutPath = "/"

export const generalErrorRedirectPath = afterSignInPath
export const unauthorizedRedirectPath = afterSignOutPath

export const toastAutoCloseOnWarning = 1000
export const toastAutoCloseOnError = 1500

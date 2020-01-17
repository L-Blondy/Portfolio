import "./src/styles/common.scss"
import "./src/components/svg.js"
import "./src/components/navbar.js"
import { writeOnVisible, WriteSequence } from "lb-write"

import { handle_responsive_CSS_variables, fixHashNav } from "./src/utils"

handle_responsive_CSS_variables()
fixHashNav()


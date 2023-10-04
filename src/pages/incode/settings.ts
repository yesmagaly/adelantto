import { create } from "@incodetech/welcome";
import { VITE_INCODE_API_URL, VITE_INCODE_CLIENT_ID } from "../../config"

const incode = create({
  clientId: VITE_INCODE_CLIENT_ID,
  apiURL: VITE_INCODE_API_URL,
  theme: {
    // main: "",
    // mainButton: {
    //   borderRadius: "",
    //   color: "",
    //   border: "",
    // },
  },
});

export default incode;

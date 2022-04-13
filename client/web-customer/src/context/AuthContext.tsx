// import {
//   createContext,
//   Dispatch,
//   SetStateAction,
//   useEffect,
//   useState,
// } from "react";
// import Router from "next/router";
// import { setCookie, parseCookies } from "nookies";
// import jwt from "jsonwebtoken";

// import axios from "axios";

// type ICustomer = {
//   customerId: string;
//   name: string;
//   email: string;
//   documentNumber: string;
//   phoneNumber: string;
//   active: string;
//   createdAt: string;
//   updatedAt: string;
//   address: Address[];
// };

// type Address = {
//   addressId: string;
//   customerId: string;
//   street: string;
//   number: number;
//   district: string;
//   city: string;
//   state: string;
//   country: string;
//   zipCode: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type ISignInData = {
//   email: string;
//   password: string;
// };

// type IAuthContext = {
//   isAuthenticated: boolean;
//   customer: ICustomer | null;
//   setCustomer: Dispatch<SetStateAction<ICustomer>>;
//   signIn: (data: ISignInData) => Promise<void>;
// };

// export const AuthContext = createContext({} as IAuthContext);

// export function AuthProvider({ children }: any) {
//   const [customer, setCustomer] = useState<ICustomer | null>(null);
//   const isAuthenticated = !!customer;

//   useEffect(() => {
//     console.log("found data", customer);
//     console.log("setted isAuthenticated", isAuthenticated);
//   }, []);

//   useEffect(() => {
//     (async () => {
//       const { customer_token: token } = parseCookies();

//       if (token && !customer) {
//         const { id }: any = jwt.decode(token);
//         await axios.get(`/api/customer/${id}`).then((res) => {
//           setCustomer(res.data?.body);
//         });
//       }
//     })();
//   }, []);

//   async function signIn({ email, password }: ISignInData) {
//     const data = await axios
//       .post("/api/customer/signin", { email, password })
//       .then((res) => {
//         return res.data;
//       });

//     setCookie(undefined, "customer_token", data?.body.token, {
//       maxAge: 60 * 60 * 1,
//     });

//     setCustomer(data?.body.customer);
//     Router.push("/");
//   }

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, customer, setCustomer, signIn }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

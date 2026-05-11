import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name: "Credentials",

            credentials:{
                email:{
                    label:"Email",
                    type:"email",
                },

                password:{
                    label:"Password",
                    type:"password",
                },
            },

            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Missing email or password");
                }

                const user = {
                    id:"1",
                    name:"shubham",
                    email:"shubham@gmail.com",
                    password: "12334834f"
                };

                if(credentials.email !== user.email){
                    throw new Error("Invalid Email");
                }

                if(credentials.password !== user.password){
                    throw new Error("Invalid password")
                }

                return{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                }
                
            }
        })
    ],

    session:{
        strategy:"jwt",
    },

    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/login"
    }
})

export {handler as GET , handler as POST}
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

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
                    password: "12334834f",
                    role: "admin"
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
                    role:user.role,
                }
                
            },
        }),

        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),

    ],

    session:{
        strategy:"jwt",
    },

    callbacks:{
        async jwt({token , user}){
            if(user){
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },

     async session({session,token}){
        if(session.user){
            session.user.id = token.id as string;
            session.user.role = token.role as string
        }
        return session;
     }

    },

    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/login"
    }
})

export {handler as GET , handler as POST}
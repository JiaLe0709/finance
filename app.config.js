const app = {
    url: process.env.NEXT_PUBLIC_URL,
    ticket: (process.env.NEXT_PUBLIC_TICKET).split(','),
}

export default app;
const app = {
    url: process.env.NEXT_PUBLIC_URL.split(','),
    ticket: (process.env.NEXT_PUBLIC_TICKET).split(','),
}

export default app;
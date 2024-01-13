const readableDate = timeStamp => new Date(timeStamp).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

export default readableDate;
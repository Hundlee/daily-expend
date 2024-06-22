export function filterSpent(spent: any, currentDate: any, filterType: any) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    switch (filterType) {
        case "today":
            return spent.filter(
                (item: any) =>
                    new Date(item.date).toDateString() ===
                    currentDate.toDateString()
            );
        case "lastWeek":
            return spent.filter(
                (item: any) => new Date(item.date) >= oneWeekAgo
            );
        default:
            return [];
    }
}

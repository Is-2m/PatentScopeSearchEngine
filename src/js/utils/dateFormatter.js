class DateFormatter {
    static formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
    }

    static getCurrentDateString() {
        return new Date().toISOString().split('T')[0];
    }
}
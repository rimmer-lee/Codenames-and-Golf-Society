const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = { toJSON: { virtuals: true } };

const SectionSchema = new Schema({
    title: String,
    description: [String],
    sections: [this]
});

const CharterSchema = new Schema({
    version: { type: String, default: 'Test', required: true },
    lastModified: {
        date: { type: Date, default: Date.now() },
        by: { type: String, default: 'anonymous user' }
        // by: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    sections: [ SectionSchema ]
}, options);

CharterSchema.virtual('lastModified.dateParts').get(function () {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(this.lastModified.date);
    const dateParts = {
        day: date.getUTCDate(),
        get dayOrdinal() {
            switch (this.day.toString().slice(-1)) {
                case '1':
                    return 'st';
                case '2':
                    return 'nd';
                case '3':
                    return 'rd';
                default:
                    return 'th';
            };
        },
        month: date.getUTCMonth() + 1,
        monthString: months[date.getUTCMonth()],
        year: date.getFullYear(),
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds(),
        time: date.toLocaleTimeString(),
        get fullDate() {
            return `${this.day}${this.dayOrdinal} ${this.monthString}, ${this.year} at ${this.time}`;
        }
    };
    return dateParts;
});

module.exports = mongoose.model('Charter', CharterSchema);
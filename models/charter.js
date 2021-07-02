const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = { toJSON: { virtuals: true } };

const SectionSchema = new Schema({
    title: String,
    description: [ String ],
    rules: [{ type: Schema.Types.ObjectId, ref: 'Rule' }]
});

const CharterSchema = new Schema({
    created: {
        date: {
            type: Date,
            default: Date.now(),
            required: true
        },
        by: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: String,
        // format of year and iteration e.g. 2021.2
        version: {
            type: String,
            required: true,
            // unique: true
        }
    },
    sections: [ SectionSchema ],
    status: {
        type: String,
        enum: ['Submitted', 'Approved'],
        required: true
    }
}, options);

CharterSchema.virtual('created.dateParts').get(function () {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(this.created.date);
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
        time: date.toLocaleTimeString(),
        meridiemTime: date.toLocaleTimeString([], {
            timeZone: 'UTC',
            hour12: true,
            hour: 'numeric',
            minute: '2-digit'
        }),
        get fullDate() {
            return `${this.day}${this.dayOrdinal} ${this.monthString}, ${this.year} at ${this.meridiemTime.toLowerCase()}`;
        }
    };
    return dateParts;
});

module.exports = mongoose.model('Charter', CharterSchema);
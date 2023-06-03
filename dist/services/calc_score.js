"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScore = void 0;
function calculateScore(number) {
    const maxNumber = 1;
    const minNumber = 90;
    const maxScore = 100;
    const minScore = 0;
    const score = Math.round(((number - minNumber) / (maxNumber - minNumber)) * (maxScore - minScore) + minScore);
    return score;
}
exports.calculateScore = calculateScore;

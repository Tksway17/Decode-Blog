const categories = require('./categories')
const data = [
    'Прогнозы в IT',
    'Веб-разработка',
    'Мобильная разработка',
    'Фриланс',
    'Алгоритмы',
    'Тестирование IT систем',
    'Разработка игр',
    'Дизайн и юзабилити',
    'Искусственный интеллект',
    'Машинное обучение'
]

async function writeDataCategory(){
    const length = await categories.countDocuments();
    if (length == 0){
        data.map((item, index) => {
            new categories({
                name: item,
                key: index
            }).save()
        })
    }
}

module.exports = writeDataCategory
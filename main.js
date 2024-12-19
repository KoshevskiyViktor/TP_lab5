const ObjInf = [
    { id: '1', description: 'Новость о событиях', createdAt: new Date('2024-12-01T12:00:00'), author: 'Иванов Иван', photoLink: 'http://example.com/photo1.jpg' },
    { id: '2', description: 'Объявление', createdAt: new Date('2024-11-25T14:00:00'), author: 'Петров Петр' },
    { id: '3', description: 'Обновление расписания', createdAt: new Date('2024-11-20T09:30:00'), author: 'Сидорова Анна', photoLink: 'http://example.com/photo3.jpg' },
    { id: '4', description: 'Событие ФПМИ', createdAt: new Date('2024-11-18T10:15:00'), author: 'Иванов Иван' },
    { id: '5', description: 'Новый курс', createdAt: new Date('2024-11-15T11:00:00'), author: 'Петров Петр', photoLink: 'http://example.com/photo5.jpg' },
    { id: '6', description: 'Конкурс на лучшую статью', createdAt: new Date('2024-11-10T16:45:00'), author: 'Сидорова Анна' },
    { id: '7', description: 'Интервью с выпускником', createdAt: new Date('2024-11-05T13:30:00'), author: 'Иванов Иван', photoLink: 'http://example.com/photo7.jpg' },
    { id: '8', description: 'Результаты олимпиады', createdAt: new Date('2024-10-30T08:20:00'), author: 'Петров Петр' },
    { id: '9', description: 'День открытых дверей', createdAt: new Date('2024-10-25T17:40:00'), author: 'Сидорова Анна' },
    { id: '10', description: 'Изменения в графике', createdAt: new Date('2024-10-20T14:10:00'), author: 'Иванов Иван' },
    { id: '11', description: 'Профориентация для школьников', createdAt: new Date('2024-10-15T18:00:00'), author: 'Петров Петр', photoLink: 'http://example.com/photo11.jpg' },
    { id: '12', description: 'Новый факультет', createdAt: new Date('2024-10-10T10:30:00'), author: 'Сидорова Анна' },
    { id: '13', description: 'Подготовка к экзаменам', createdAt: new Date('2024-10-05T15:25:00'), author: 'Иванов Иван', photoLink: 'http://example.com/photo13.jpg' },
    { id: '14', description: 'Семинар по программированию', createdAt: new Date('2024-09-30T11:00:00'), author: 'Петров Петр' },
    { id: '15', description: 'Обзор новых технологий', createdAt: new Date('2024-09-25T13:15:00'), author: 'Сидорова Анна', photoLink: 'http://example.com/photo15.jpg' },
    { id: '16', description: 'Практика студентов', createdAt: new Date('2024-09-20T16:10:00'), author: 'Иванов Иван' },
    { id: '17', description: 'Образовательные проекты', createdAt: new Date('2024-09-15T10:05:00'), author: 'Петров Петр' },
    { id: '18', description: 'Выпускной вечер', createdAt: new Date('2024-09-10T14:30:00'), author: 'Сидорова Анна', photoLink: 'http://example.com/photo18.jpg' },
    { id: '19', description: 'Информация для первокурсников', createdAt: new Date('2024-09-05T09:50:00'), author: 'Иванов Иван' },
    { id: '20', description: 'Научные конференции', createdAt: new Date('2024-09-01T08:45:00'), author: 'Петров Петр' }
  ];
  
  class ObjManager {
    constructor(objs) {
      this._objs = objs || [];
    }
  
    getObjs(skip = 0, top = 10, filterConfig = {}) {
      let result = [...this._objs];
      if (filterConfig.author) {
        result = result.filter(obj => obj.author === filterConfig.author);
      }
      if (filterConfig.description) {
        result = result.filter(obj => obj.description.includes(filterConfig.description));
      }
      result.sort((a, b) => a.createdAt - b.createdAt);
      return result.slice(skip, skip + top);
    }
  
    getObj(id) {
      return this._objs.find(obj => obj.id === id) || null;
    }
  
    validateObj(obj) {
      return obj.id && typeof obj.id === 'string' &&
             !this._objs.some(o => o.id === obj.id) &&
             obj.description && typeof obj.description === 'string' && obj.description.trim().length > 0 && obj.description.length < 200 &&
             obj.createdAt instanceof Date &&
             obj.author && typeof obj.author === 'string' && obj.author.trim().length > 0;
    }
  
    addObj(obj) {
      if (this.validateObj(obj)) {
        this._objs.push(obj);
        return true;
      }
      return false;
    }
  
    editObj(id, newObj) {
      const obj = this.getObj(id);
      if (!obj || newObj.id || newObj.author || newObj.createdAt) {
        return false;
      }
      Object.assign(obj, newObj);
      return true;
    }
    
    removeObj(id) {
      const index = this._objs.findIndex(obj => obj.id === id);
      if (index === -1) return false;
      this._objs.splice(index, 1);
      return true;
    }
  
    addAll(objs) {
      const invalidObjs = objs.filter(obj => !this.validateObj(obj));
      this._objs.push(...objs.filter(obj => this.validateObj(obj)));
      return invalidObjs;
    }
  
    clear() {
      this._objs = [];
    }
  }
  
  const manager = new ObjManager(ObjInf);

  console.log('Все объекты:', manager.getObjs(0, manager._objs.length));
  console.log('Фильтр по автору Иванов Иван:', manager.getObjs(0, 10, { author: 'Иванов Иван' }));
  console.log('Добавление нового объекта:', manager.addObj({ id: '21', description: 'Новое событие', createdAt: new Date(), author: 'Новиков Никита' }));
  console.log('Изменение объекта с id 1:', manager.editObj('1', { description: 'Измененная новость' }));
  console.log('Удаление объекта с id 2:', manager.removeObj('2'));
  console.log('Оставшиеся объекты:', manager.getObjs());  
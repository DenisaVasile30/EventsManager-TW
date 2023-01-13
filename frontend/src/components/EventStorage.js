import {EventEmitter} from 'fbemitter';

const SERVER = 'http://localhost:8000';

class EventStorage {
  constructor() {
    this.data = [];
    this.emitter = new EventEmitter();
    this.generatedStatus ='';
  }

  async getEvents() {
    try {
      const href = window.location.href;
      const id = href.split('/').at(-1);
      const response = await fetch(`${SERVER}/users/${id}/events`); 
      if (!response.ok) {
          throw response;
      }
      this.data = await response.json();
      this.emitter.emit('GET_EVENTS_SUCCESS');
    } catch(err) {
      console.warn(err);
      this.emitter.emit('GET_EVENTS_ERROR');
    }
  };

  async addEvent(event) {
    try {
      const href = window.location.href;
      const id = href.split('/').at(-1);

      const response = await fetch(`${SERVER}/users/${id}/events/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
      if (!response.ok) {
        throw response;
      }
      this.getEvents();
      this.generatedStatus = response.status;
    } catch(err) {
      console.warn(err);
      this.emitter.emit('ADD_EVENT_ERROR');
    }
  };

  async updateEvent(idEvent, event) {
    try {
      const href = window.location.href;
      const id = href.split('/').at(-1);
      const response = await fetch(`${SERVER}/users/${id}/events/edit/${idEvent}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
      if (!response.ok) {
          throw response;
      }
      this.getEvents();
      this.generatedStatus = response.status;
    } catch(err) {
      console.warn(err);
      this.emitter.emit('EDIT_EVENT_ERROR');
    }
  };

  async deleteEvent(idEvent) {
    try {
      const href = window.location.href;
      const id = href.split('/').at(-1);
      const response = await fetch(`${SERVER}/users/${id}/events/delete/${idEvent}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw response;
      }
      this.getEvents();
    } catch(err) {
      console.warn(err);
      this.emitter.emit('DELETE_EVENT_ERROR');
    }
  };
}

const eventStorage = new EventStorage();

export default eventStorage;
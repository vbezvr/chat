export const html = {
  getTemplateOutcomeMessage() {
      const template = document.createElement('template');
      template.innerHTML = `<div class="message outcome-msg"><span class="text">Я: </span><span class="time">18:45</span></div>`;
      return template;
    },
    
  getTemplateIncomeMessage() {
      const template = document.createElement('template');
      template.innerHTML = `<div class="message income-msg"><span class="text">Я: </span><span class="time">18:45</span></div>`;
      return template;
  }
    
};
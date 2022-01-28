import { TaskInfo } from "../validators/taskValidators";

class CardInfoCreator {
    static createTaskInfo(taskId: string) {
        const card = document.getElementById(taskId) as HTMLElement;

        card.insertAdjacentHTML(
            "beforeend",
            `
            
        <div class='task__info__container'>
  <h2 class='task__info__header'>Change log</h2>
  <ul class='task__info__list task__info__list--${taskId}'>


  </ul>
</div>
        
        `
        );
    }
    static createTaskSingleInfo(taskId: string, taskSingleInformation: TaskInfo): void {
        const listItem = document.querySelector(`.task__info__list--${taskId}`) as HTMLElement;

        const date = new Date(taskSingleInformation.time);
        const formattedDate = date.toLocaleDateString("pl-PL");
        const formattedTime = date.toLocaleTimeString("pl-PL");
        listItem.insertAdjacentHTML(
            "beforeend",
            `
                <li class='task__info__listItem'>
      <p class='task__info__label'>Author:</h>
      <p>${taskSingleInformation.author}</p>
      <p class='task__info__label'>Change:</p>
      <p>${taskSingleInformation.change}</p>
      <p class='task__info__label'>Time:</p>
      <time>${formattedTime} - ${formattedDate}</time>
    </li>
        `
        );
    }
    static removeTaskInfo(taskId: string) {
        const card = document.getElementById(taskId) as HTMLElement;
        card.removeChild(card.children[4]);
    }
}

export { CardInfoCreator };

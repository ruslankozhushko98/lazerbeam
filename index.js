import fs from 'fs';

const KEYS = {
  CHARGE: 'C',
  SHOT: 'S',
  IMPOSSIBLE: 'IMPOSSIBLE',
};

const getActions = () => {
  const fileContent = fs.readFileSync('./attack.txt', {
    encoding: 'ascii',
  });

  return fileContent
    .split(`\n`)
    .filter(str => str.trim().length !== 0)
    .map(item => {
      const [D, P] = item.split(' ');
      return { D, P };
    });
};

const getHacksAmount = ({ D, P }) => {
  const hasS = P.includes(KEYS.SHOT);
  const hasC = P.includes(KEYS.CHARGE);

  let damage = 0;
  let power = 1;

  if (!hasS) {
    return 0;
  }

  if (!hasC) {
    return KEYS.IMPOSSIBLE;
  }

  const actions = P.split('');
  let hacksAmount = 0;

  for (const item of actions) {
    if (item === KEYS.CHARGE) {
      power *= 2;
    }

    if (item === KEYS.SHOT) {
      damage += power;
    }
  }

  for (let index = 0; index < actions.length; index++) {
    const currentItem = actions[index];
    const nextItem = actions[index + 1];

    if (damage > +D && currentItem === KEYS.CHARGE && nextItem === KEYS.SHOT) {
      hacksAmount++;

      actions[index] = nextItem;
      actions[index + 1] = currentItem;
    }
  }

  return hacksAmount;
};

const getCases = (arr) => {
  return arr.map((shot, index) => {
    const hacksAmount = getHacksAmount(shot);
    return `Case #${index + 1}: ${hacksAmount}`;
  });
};

(() => {
  const actions = getActions();
  const cases = getCases(actions);

  console.log(cases);
})();

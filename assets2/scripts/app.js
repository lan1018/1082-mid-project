const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const Heal_VALUE = 20;

const LOG_EVENT_PLAYER_ATTACK = 'ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let logEvent;
let battleLog = [];

let chosenMaxLife = 100;
const enteredValue = prompt('Maximum life for you and monster:');
chosenMaxLife = parseInt(enteredValue);
if (isNaN(chosenMaxLife || chosenMaxLife <= 0)) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
  currentPlayerHealth = chosenMaxLife;
  currentMonsterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
  };
  battleLog.push(logEntry);
  console.log(battleLog);
}

function endRound() {
  const initialPlayerHeath = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHeath;
    setPlayerHealth(initialPlayerHeath);
    alert('You would be dead but the bonus live save you once.');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('player won');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('monster won');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('It is a draw');
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

function attackHandler() {
  attackMonster('ATTACK');
}

function strongAttackHandler() {
  attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - Heal_VALUE) {
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = Heal_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);

/**** GAME ****/
const WINDOW_WIDTH = 768;
const WINDOW_HEIGHT = 768;
const FPS = 1000 / 60;


/**** SHIP ****/
const SHIP_WIDTH = 720;
const SHIP_HEIGHT = 713;
const SPEED_MOVE = 5;
const SHIP_BULLET_RECHARGED = 200;
const EXPLOTION_WIDTH = 160;
const EXPLOTION_HEIGHT = 170;

const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_FIRE = 32;
const KEY_SPECIAL_POWER = 17;
const KEY_E = 69;
const KEY_R = 82;
const KEY_T = 84;
const KEY_U = 85;

/**** BULLET SHIP ****/
const BULLET_WIDTH = 200;
const BULLET_HEIGHT = 198;
const BULLET_SPECIAL_WIDTH = 1300;
const BULLET_SPECIAL_HEIGHT = 1780;
const SPEED_BULLET = 5;



/**** ENEMY ****/
const ENEMY_WIDTH = 465;
const ENEMY_HEIGHT = 410;
const ENEMY_SPACE_INVADER_WIDTH = 228;
const ENEMY_SPACE_INVADER_HEIGHT = 270;
let ENEMY_SPEED = 3;
const ENEMY_WIDTH_LIMIT = 675 // entran 15 enemigos dejando uno de espacio entran 8
const ENEMY_RUN_ANIMATION = 100;

/**** BULLET ENEMY ****/
const BULLET_ENEMY_WIDTH = 1024;
const BULLET_ENEMY_HEIGHT = 1024;



/**** LIVES ****/
const LIVES_WIDTH = 512;
const LIVES_HEIGHT = 512;

/**** SCORES ****/
const SCORE_KEY = 'scores'
# Space Invaders (IronHack first project)

The task is to create a functional video game, where it is possible to win and/or lose. To carry out this challenge, I had one week and I chose to design a “tribute” game to Space Invaders.
All background images that can be seen have been designed by artificial intelligence and retouched with photopea.com (photoshop).
To prevent the video game from being monotonous, in addition to increasing the speed of the enemies every 20 points in the middle of the game (40 points), the sprite of the alien is changed to the classic alien from Space Invaders, and to increase complexity, they appear randomly in different colors. Thus, it is possible to distract and confuse the player.
The player wins if he reaches 80 points seeking to generate short and dynamic games, he loses if he is hit 5 times by the aliens' bullets or if he is hit directly by an alien.

## Screenshots


Start menu

![start game](https://i.postimg.cc/026pV3pV/start-Menu.png)

Game

![game](https://i.postimg.cc/qqK2v6B9/gameOn1.png)

Win game

![gameOver](https://i.postimg.cc/mkkQfpK2/win-Screen.png)

## Instructions

![keyboard movements](https://i.postimg.cc/CKnTcS9s/keyboard-movements.jpg)

## Play
<span>[![PLAY!](https://i.postimg.cc/3NsvVgBx/6f3e6465-ac9e-4c5b-bf6c-ffd90c0886b0.jpg)](https://ironspacefirstproject.netlify.app/)</span>

## Technologies

- HTML
- CSS
- JavaScript

## Functionalities

##### 1. Start Menu:
Main menu of the game where we can find a __start__ button, a __score__ button and an __input__ to put the player's name, in case the player does not put his name it will automatically be filled with "player 1". 
We tried to make a simple design to highlight the image and for the buttons we looked for the aesthetics of the old video game machines.

##### 2. Game:
The screen consists of a ship that moves from left to right with the arrow keys, you shoot with the space bar and every 20 points you can shoot a special bullet with the ctrl key.
The enemies are generated automatically in groups of 9 every 3 seconds, every 20 points the enemies increase their speed and at 40 points (half of the game) the sprite changes to the classic space invaders enemies that randomly come out in different colors to confuse and distract the player. At 80 points the player wins the game.
At the top left you can see a __score__ sector where the player can see how many points he has, another __lives__ where there are 5 hearts trying to emulate the lives of Zelda, every time a bullet hits the player a heart is erased and finally below there is a mini space invader which is a button that controls the sound, if pressed changes to red and the sound bars are removed implying that it is in mute.

##### 3. Game over:
The player loses if he is hit 5 times by enemy bullets or if the enemy touches him. In the Game Over screen we can find 3 buttons __score__, __restart__ and __start menu__ giving the player the opportunity to start another game on the spot, check how many points he made or go back to the main menu for another player to put his name and start a new game.

##### 4. Win game:
To generate dynamism, when the player wins, randomly two different screens can appear, in this way it is sought to generate a surprise in the player and that the game is not monotonous.
This screen has 3 buttons __score__, __restart__ and __start menu__.

##### 5. Score:
In this screen we can see the player's score, the information is taken from the browser's local storage.

## How to Contribute

1. fork the repository.
2. Create a new branch: git checkout -b new-functionality
3. Make your changes and commit: git commit -m 'Add new functionality'.
4. Upload your changes: git push origin new-functionality
5. Open a pull request.
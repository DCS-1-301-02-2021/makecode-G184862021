scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    . 2 2 . . . . . . . . . . . . .
    . . 2 2 . . . . . . . . . . . .
    . . . 2 2 1 1 1 5 . . . . . . .
    . . . 2 2 2 . . . . . . . . . .
    1 . . 2 2 2 2 2 2 . . . . . . .
    1 . 2 2 2 2 2 2 2 8 8 8 9 . . .
    1 1 2 2 2 2 2 2 2 2 2 8 8 8 2 .
    1 1 2 2 2 2 2 2 2 2 2 2 2 2 2 5
    1 1 2 2 2 2 2 2 2 1 d d d 1 1 .
    1 . 2 2 2 2 2 . . . . . . . . .
    1 . . . 2 2 1 1 1 1 5 . . . . .
    . . . 2 2 . . . . . . . . . . .
    . . 2 2 2 . . . . . . . . . . .
    . 2 2 2 . . . . . . . . . . . .
    2 2 2 . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            2 . . . . . . . . . . . . . . .
            3 2 . . . . . . . . . . . . . .
            5 2 5 1 1 1 1 1 1 1 1 1 1 f 8 9
            2 5 2 1 1 1 1 1 1 1 1 1 1 f 8 9
            5 2 . . . . . . . . . . . . . .
            2 . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update() {
    let bogy = sprites.create(assets.image`bogy`, SpriteKind.Enemy)
    bogy.setVelocity(-50, randint(-30, 30))
    bogy.y = randint(0, scene.screenHeight())
    bogy.left = scene.screenWidth()
    bogy.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})

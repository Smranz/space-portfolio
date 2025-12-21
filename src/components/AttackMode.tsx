"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, Heart, Trophy, RotateCcw } from "lucide-react";

interface Enemy {
    id: number;
    x: number;
    y: number;
    speed: number;
}

interface Bullet {
    id: number;
    x: number;
    y: number;
    targetX: number;
    targetY: number;
}

interface Explosion {
    id: number;
    x: number;
    y: number;
}

interface Star {
    id: number;
    x: number;
    y: number;
    speed: number;
    size: number;
}

const WIN_SCORE = 200;

const AttackMode = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [playerX, setPlayerX] = useState(50);
    const [playerY, setPlayerY] = useState(50);
    const [bullets, setBullets] = useState<Bullet[]>([]);
    const [enemies, setEnemies] = useState<Enemy[]>([]);
    const [explosions, setExplosions] = useState<Explosion[]>([]);
    const [stars, setStars] = useState<Star[]>([]);
    const bulletIdRef = useRef(0);
    const enemyIdRef = useRef(0);

    // Initialize stars
    useEffect(() => {
        const initialStars: Star[] = [];
        for (let i = 0; i < 150; i++) {
            initialStars.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                speed: 0.5 + Math.random() * 2,
                size: 1 + Math.random() * 2,
            });
        }
        setStars(initialStars);
    }, []);

    // Animate stars - flying towards viewer
    useEffect(() => {
        const interval = setInterval(() => {
            setStars(prev => prev.map(star => {
                // Stars move from center outward
                const centerX = 50;
                const centerY = 40;
                const dx = star.x - centerX;
                const dy = star.y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 70) {
                    // Reset star to center
                    return {
                        ...star,
                        x: centerX + (Math.random() - 0.5) * 20,
                        y: centerY + (Math.random() - 0.5) * 20,
                        size: 1,
                    };
                }

                // Move outward and grow
                const angle = Math.atan2(dy, dx);
                const newX = star.x + Math.cos(angle) * star.speed;
                const newY = star.y + Math.sin(angle) * star.speed;
                const newSize = Math.min(star.size + 0.05, 4);

                return { ...star, x: newX, y: newY, size: newSize };
            }));
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const getEnemySpeed = () => {
        const baseSpeed = 0.15; // Very slow start
        const speedIncrease = Math.min(score / 150, 1.0); // Gradual increase, max +1.0
        return baseSpeed + speedIncrease + Math.random() * 0.1;
    };

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!gameStarted || gameOver || gameWon) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setPlayerX(Math.max(5, Math.min(95, x)));
        setPlayerY(Math.max(5, Math.min(95, y)));
    }, [gameStarted, gameOver, gameWon]);

    // SIMPLE: Click to shoot - if you click near an enemy, it gets destroyed!
    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!gameStarted || gameOver || gameWon) return;

        // Get exact click position as percentage
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = ((e.clientX - rect.left) / rect.width) * 100;
        const clickY = ((e.clientY - rect.top) / rect.height) * 100;

        // Find closest enemy to click
        let closestEnemy: Enemy | null = null;
        let closestDistance = Infinity;

        enemies.forEach(enemy => {
            const dx = clickX - enemy.x;
            const dy = clickY - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestEnemy = enemy;
            }
        });

        // Very generous hit radius - 15% of screen
        const hitRadius = 15;

        if (closestEnemy && closestDistance < hitRadius) {
            // HIT! Remove this enemy
            setEnemies(prev => prev.filter(e => e.id !== closestEnemy!.id));
            setExplosions(exp => [...exp, { id: Date.now(), x: closestEnemy!.x, y: closestEnemy!.y }]);
            setScore(s => s + 10);
        }

        // Always show where you clicked
        setExplosions(exp => [...exp, { id: Date.now() + 1, x: clickX, y: clickY }]);
    }, [gameStarted, gameOver, gameWon, enemies]);

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setGameWon(false);
        setScore(0);
        setLives(3);
        setEnemies([]);
        setBullets([]);
        setExplosions([]);
    };

    // Check win condition
    useEffect(() => {
        if (score >= WIN_SCORE && !gameWon && !gameOver) {
            setGameWon(true);
            setHighScore(h => Math.max(h, score));
        }
    }, [score, gameWon, gameOver]);

    // Move bullets in their direction - FAST
    useEffect(() => {
        if (!gameStarted || gameOver || gameWon) return;
        const interval = setInterval(() => {
            setBullets(prev => {
                return prev.filter(b => {
                    // Remove bullets that are off screen
                    return b.x >= -5 && b.x <= 105 && b.y >= -5 && b.y <= 105;
                }).map(b => {
                    const bulletSpeed = 2.5; // Bullet speed
                    return {
                        ...b,
                        x: b.x + b.targetX * bulletSpeed,
                        y: b.y + b.targetY * bulletSpeed,
                    };
                });
            });
        }, 16); // 60fps
        return () => clearInterval(interval);
    }, [gameStarted, gameOver, gameWon]);

    // Spawn enemies from center
    useEffect(() => {
        if (!gameStarted || gameOver || gameWon) return;
        const spawnRate = Math.max(1000, 2000 - score * 5);
        const interval = setInterval(() => {
            const angle = Math.random() * Math.PI * 2;
            setEnemies(prev => [...prev, {
                id: enemyIdRef.current++,
                x: 50 + Math.cos(angle) * 3,
                y: 40 + Math.sin(angle) * 3,
                speed: getEnemySpeed(),
            }]);
        }, spawnRate);
        return () => clearInterval(interval);
    }, [gameStarted, gameOver, gameWon, score]);

    // Move enemies outward from center - separate from bullets
    useEffect(() => {
        if (!gameStarted || gameOver || gameWon) return;
        const interval = setInterval(() => {
            setEnemies(prev => {
                const updated = prev.map(e => {
                    const centerX = 50;
                    const centerY = 40;
                    const dx = e.x - centerX;
                    const dy = e.y - centerY;
                    const angle = Math.atan2(dy, dx);

                    return {
                        ...e,
                        x: e.x + Math.cos(angle) * e.speed,
                        y: e.y + Math.sin(angle) * e.speed,
                    };
                });

                const escaped = updated.filter(e => {
                    const dx = e.x - 50;
                    const dy = e.y - 40;
                    return Math.sqrt(dx * dx + dy * dy) > 55;
                });

                if (escaped.length > 0) {
                    setLives(l => {
                        const newLives = l - escaped.length;
                        if (newLives <= 0) {
                            setGameOver(true);
                            setHighScore(h => Math.max(h, score));
                        }
                        return Math.max(0, newLives);
                    });
                }

                return updated.filter(e => {
                    const dx = e.x - 50;
                    const dy = e.y - 40;
                    return Math.sqrt(dx * dx + dy * dy) <= 55;
                });
            });
        }, 50); // Enemy movement at different rate than bullets
        return () => clearInterval(interval);
    }, [gameStarted, gameOver, gameWon, score]);

    // Collision detection - check every frame
    useEffect(() => {
        if (!gameStarted || gameOver || gameWon) return;
        const interval = setInterval(() => {
            const currentBullets = [...bullets];
            const currentEnemies = [...enemies];
            const bulletsToRemove: number[] = [];
            const enemiesToRemove: number[] = [];

            currentBullets.forEach(bullet => {
                currentEnemies.forEach(enemy => {
                    if (enemiesToRemove.includes(enemy.id)) return;

                    const dx = bullet.x - enemy.x;
                    const dy = bullet.y - enemy.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Large hit radius based on enemy size (further = smaller hitbox)
                    const enemyDist = Math.sqrt((enemy.x - 50) ** 2 + (enemy.y - 40) ** 2);
                    const hitRadius = 4 + (enemyDist / 4);

                    if (distance < hitRadius) {
                        bulletsToRemove.push(bullet.id);
                        enemiesToRemove.push(enemy.id);
                        setExplosions(prev => [...prev, { id: Date.now() + enemy.id, x: enemy.x, y: enemy.y }]);
                        setScore(s => s + 10);
                    }
                });
            });

            if (bulletsToRemove.length > 0) {
                setBullets(prev => prev.filter(b => !bulletsToRemove.includes(b.id)));
            }
            if (enemiesToRemove.length > 0) {
                setEnemies(prev => prev.filter(e => !enemiesToRemove.includes(e.id)));
            }
        }, 16);
        return () => clearInterval(interval);
    }, [gameStarted, gameOver, gameWon, bullets, enemies]);

    // Clear explosions
    useEffect(() => {
        if (explosions.length === 0) return;
        const timeout = setTimeout(() => {
            setExplosions(prev => prev.slice(1));
        }, 400);
        return () => clearTimeout(timeout);
    }, [explosions]);

    return (
        <div
            className="fixed inset-0 overflow-hidden cursor-crosshair"
            style={{ background: "radial-gradient(ellipse at 50% 40%, #0a0520 0%, #000 100%)" }}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
        >
            {/* Moving Stars - Hyperspace Effect */}
            {stars.map(star => {
                const centerX = 50;
                const centerY = 40;
                const dx = star.x - centerX;
                const dy = star.y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const opacity = Math.min(distance / 30, 1);

                return (
                    <div
                        key={star.id}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            opacity: opacity * 0.8,
                            boxShadow: distance > 30 ? `0 0 ${star.size * 2}px rgba(255,255,255,0.5)` : 'none',
                        }}
                    />
                );
            })}

            {/* Horizon Glow */}
            <div
                className="absolute w-32 h-32 rounded-full"
                style={{
                    left: '50%',
                    top: '40%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(100,50,150,0.3) 0%, transparent 70%)',
                }}
            />

            {/* Cockpit Frame */}
            <div className="absolute inset-0 pointer-events-none z-50">
                {/* Top frame */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black via-gray-900/90 to-transparent" />
                {/* Bottom frame - Dashboard */}
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent" />
                {/* Left frame */}
                <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-900/90 to-transparent" />
                {/* Right frame */}
                <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-900/90 to-transparent" />

                {/* Windshield Frame Lines */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <path d="M 0,0 L 15%,15% L 15%,85% L 0,100%" fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="2" />
                    <path d="M 100%,0 L 85%,15% L 85%,85% L 100%,100%" fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="2" />
                    <path d="M 0,0 L 50%,10% L 100%,0" fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="2" />
                </svg>

                {/* HUD Elements */}
                <div className="absolute top-6 left-6 text-red-500/70 text-[10px] font-mono">
                    <div>RADAR: ACTIVE</div>
                    <div>LOCK: READY</div>
                </div>
                <div className="absolute top-6 right-6 text-red-500/70 text-[10px] font-mono text-right">
                    <div>SHIELDS: 100%</div>
                    <div>WEAPONS: HOT</div>
                </div>
            </div>

            {/* Game Stats - Bottom Dashboard */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-50">
                <div className="flex items-center gap-2 px-4 py-2 bg-black/70 rounded-lg border border-red-500/50 backdrop-blur-sm">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-400 font-mono text-sm">{score} / {WIN_SCORE}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-black/70 rounded-lg border border-red-500/50 backdrop-blur-sm">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-red-400 font-mono text-sm">{lives}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-black/70 rounded-lg border border-orange-500/50 backdrop-blur-sm">
                    <span className="text-orange-400 font-mono text-sm">HIGH: {highScore}</span>
                </div>
            </div>

            {/* Crosshair following mouse */}
            {gameStarted && !gameOver && !gameWon && (
                <div
                    className="absolute pointer-events-none z-40"
                    style={{ left: `${playerX}%`, top: `${playerY}%`, transform: 'translate(-50%, -50%)' }}
                >
                    <div className="w-12 h-12 border-2 border-orange-500/70 rounded-full animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full" />
                    <div className="absolute top-1/2 left-0 w-3 h-[2px] bg-orange-500 -translate-y-1/2" />
                    <div className="absolute top-1/2 right-0 w-3 h-[2px] bg-orange-500 -translate-y-1/2" />
                    <div className="absolute top-0 left-1/2 w-[2px] h-3 bg-orange-500 -translate-x-1/2" />
                    <div className="absolute bottom-0 left-1/2 w-[2px] h-3 bg-orange-500 -translate-x-1/2" />
                </div>
            )}

            {/* Enemies - Coming from center horizon */}
            {enemies.map(enemy => {
                const centerX = 50;
                const centerY = 40;
                const dx = enemy.x - centerX;
                const dy = enemy.y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const scale = 0.2 + (distance / 50) * 1.5;
                const opacity = Math.min(0.3 + (distance / 40), 1);

                return (
                    <div
                        key={enemy.id}
                        className="absolute pointer-events-none"
                        style={{
                            left: `${enemy.x}%`,
                            top: `${enemy.y}%`,
                            transform: `translate(-50%, -50%) scale(${scale})`,
                            opacity: opacity,
                            zIndex: Math.floor(distance),
                        }}
                    >
                        {/* Enemy Fighter Jet */}
                        <div className="relative">
                            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-600"
                                style={{ filter: `drop-shadow(0 0 ${5 + distance / 5}px #dc2626)` }} />
                            {/* Wings */}
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-red-700" />
                            {/* Engine glow */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-4 bg-gradient-to-t from-transparent to-cyan-400 rounded-full opacity-70" />
                        </div>
                    </div>
                );
            })}

            {/* Bullets - Flying toward center */}
            {bullets.map(bullet => {
                const centerX = 50;
                const centerY = 40;
                const dx = bullet.x - centerX;
                const dy = bullet.y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const scale = Math.max(0.3, 1 - (distance / 50));

                return (
                    <motion.div
                        key={bullet.id}
                        className="absolute pointer-events-none"
                        style={{
                            left: `${bullet.x}%`,
                            top: `${bullet.y}%`,
                            transform: `translate(-50%, -50%)`,
                            zIndex: 30,
                        }}
                    >
                        <div
                            className="bg-yellow-400 rounded-full"
                            style={{
                                width: `${8 * scale}px`,
                                height: `${8 * scale}px`,
                                boxShadow: `0 0 ${10 * scale}px #facc15, 0 0 ${20 * scale}px #facc15`,
                            }}
                        />
                    </motion.div>
                );
            })}

            {/* Explosions */}
            {explosions.map(exp => {
                const centerX = 50;
                const centerY = 40;
                const dx = exp.x - centerX;
                const dy = exp.y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const baseScale = 0.5 + (distance / 40);

                return (
                    <motion.div
                        key={exp.id}
                        className="absolute pointer-events-none"
                        style={{
                            left: `${exp.x}%`,
                            top: `${exp.y}%`,
                            transform: 'translate(-50%, -50%)',
                            zIndex: 100,
                        }}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2 * baseScale, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div
                            className="w-12 h-12 rounded-full"
                            style={{ background: 'radial-gradient(circle, #facc15 0%, #f97316 50%, #dc2626 100%)' }}
                        />
                    </motion.div>
                );
            })}

            {/* Start Screen */}
            {!gameStarted && !gameOver && !gameWon && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-[60]">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-red-500 font-orbitron mb-2">ATTACK MODE</h1>
                        <h2 className="text-2xl font-bold text-orange-400 font-orbitron mb-6">SPACE FIGHTER</h2>
                        <p className="text-gray-400 mb-2">Move mouse to aim anywhere on screen</p>
                        <p className="text-gray-400 mb-4">Click to fire at enemy fighters</p>
                        <p className="text-yellow-400 text-lg mb-8">🏆 Score {WIN_SCORE} points to WIN!</p>
                        <button
                            onClick={startGame}
                            className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-lg transition-all hover:scale-105 flex items-center gap-3 mx-auto"
                        >
                            <Zap className="w-6 h-6" />
                            ENGAGE
                        </button>
                    </motion.div>
                </div>
            )}

            {/* Game Over Screen */}
            {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-[60]">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl font-bold text-red-500 font-orbitron mb-4">MISSION FAILED</h2>
                        <p className="text-yellow-400 text-2xl mb-2">Score: {score}</p>
                        <p className="text-orange-400 text-lg mb-8">High Score: {highScore}</p>
                        <button
                            onClick={startGame}
                            className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-lg transition-all hover:scale-105 flex items-center gap-3 mx-auto"
                        >
                            <RotateCcw className="w-6 h-6" />
                            TRY AGAIN
                        </button>
                    </motion.div>
                </div>
            )}

            {/* Win Screen */}
            {gameWon && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-[60]">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl font-bold text-green-400 font-orbitron mb-2">🏆 VICTORY! 🏆</h2>
                        <h3 className="text-2xl font-bold text-yellow-400 font-orbitron mb-6">MISSION COMPLETE</h3>
                        <p className="text-green-400 text-2xl mb-2">Score: {score}</p>
                        <p className="text-orange-400 text-lg mb-8">High Score: {highScore}</p>
                        <button
                            onClick={startGame}
                            className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-lg transition-all hover:scale-105 flex items-center gap-3 mx-auto"
                        >
                            <Zap className="w-6 h-6" />
                            PLAY AGAIN
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AttackMode;

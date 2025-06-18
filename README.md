# Valorant Agents Styling - Version 1.5

## Agents Progress

Nous avons stylisé les agents suivants jusqu'à **la version V1.5** :

01 - Brimstone | Controller |✅
02 - Viper | Controller |✅
03 - Omen | Controller |✅
04 - Killjoy | Sentinel |✅  
05 - Cypher | Sentinel |✅  
06 - Sova | Initiator |
07 - Sage | Sentinel |✅  
09 - Phoenix | Duelist |✅
10 - Jett | Duelist |✅
11 - Reyna | Duelist |
12 - Raze | Duelist |
13 - Breach | Initiator |
14 - Skye | Initiator |
15 - Yoru | Duelist |
16 - Astra | Controller |
17 - KAY/O | Initiator |  
18 - Chamber | Sentinel |
19 - Neon | Duelist |
20 - Fade | Initiator |
21 - Harbor | Controller |
22 - Gekko | Initiator |
23 - Deadlock | Sentinel |
24 - Iso | Duelist |
25 - Clove | Controller |
26 - Vyse | Sentinel |
27 - Tejo | Initiator |
28 - Waylay | Duelist |

Les autres agents seront ajoutés dans les prochaines mises à jour ! 🎯

---

## CSS Structure

Chaque agent suit une structure CSS définie comprenant :

1. Un **dégradé de fond** spécifique à son identité visuelle.
2. Une **animation de portrait** pour donner du dynamisme.
3. Une **animation de lueur** pour renforcer son effet graphique.

### **Exemple - Cypher** 🕵️‍♂️

```css
.agent-section.cypher {
  background: linear-gradient(135deg, #5989c7 0%, #131319 100%);
}

.cypher .agent-portrait-container.animate {
  animation: cypherScan 4s ease-in-out infinite;
}

.cypher .agent-glow.animate {
  opacity: 1;
  background: radial-gradient(
    circle,
    rgba(89, 137, 199, 0.5) 0%,
    transparent 70%
  );
  animation: cypherDistortion 3s ease-in-out infinite alternate;
}

@keyframes cypherScan {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.85;
  }
}

@keyframes cypherDistortion {
  0% {
    transform: translateY(0px);
    opacity: 0.7;
  }
  100% {
    transform: translateY(-10px);
    opacity: 0.4;
  }
}
```

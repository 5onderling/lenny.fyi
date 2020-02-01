import cursor from './cursor';
cursor({ hideTransition: true });

import themeSwitcher from './themeSwitcher';
themeSwitcher();

import skipNavigation from './skipNavigation';
skipNavigation();

import hotlinks from './hotlinks';
hotlinks({ elementSelector: 'main' });

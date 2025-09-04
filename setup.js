#!/usr/bin/env node

/**
 * Jarvio Interview Setup Validation
 * 
 * Validates that the development environment is set up correctly
 * and provides helpful debugging information.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const checkFile = (filePath, description) => {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description}`, 'green');
    return true;
  } else {
    log(`❌ ${description} - Missing: ${filePath}`, 'red');
    return false;
  }
};

const checkPort = async (port, name) => {
  return new Promise((resolve) => {
    const command = process.platform === 'win32' 
      ? `netstat -an | findstr :${port}`
      : `lsof -i :${port}`;
    
    const proc = spawn('sh', ['-c', command], { stdio: ['pipe', 'pipe', 'pipe'] });
    
    proc.on('close', (code) => {
      if (code === 0) {
        log(`✅ ${name} is running on port ${port}`, 'green');
        resolve(true);
      } else {
        log(`⚠️  ${name} not detected on port ${port}`, 'yellow');
        resolve(false);
      }
    });
    
    proc.on('error', () => {
      log(`⚠️  Could not check ${name} status`, 'yellow');
      resolve(false);
    });
  });
};

const makeHttpRequest = async (url, description) => {
  try {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(url, { timeout: 5000 });
    
    if (response.ok) {
      log(`✅ ${description} - ${response.status}`, 'green');
      return true;
    } else {
      log(`❌ ${description} - HTTP ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ ${description} - ${error.message}`, 'red');
    return false;
  }
};

async function main() {
  log('\n🚀 JARVIO INTERVIEW SETUP VALIDATION\n', 'bold');
  
  // Check project structure
  log('📁 Project Structure:', 'cyan');
  const structureChecks = [
    ['package.json', 'Root package.json'],
    ['frontend/package.json', 'Frontend package.json'],
    ['backend/package.json', 'Backend package.json'],
    ['frontend/src/App.tsx', 'Frontend App component'],
    ['backend/src/index.ts', 'Backend server'],
    ['frontend/src/lib/api.ts', 'API client'],
    ['frontend/src/types.ts', 'TypeScript types'],
    ['backend/src/data/mockData.ts', 'Mock data'],
  ];
  
  const structureValid = structureChecks.every(([file, desc]) => checkFile(file, desc));
  
  // Check dependencies
  log('\n📦 Dependencies:', 'cyan');
  try {
    const frontendPkg = JSON.parse(fs.readFileSync('frontend/package.json'));
    const backendPkg = JSON.parse(fs.readFileSync('backend/package.json'));
    
    const frontendDeps = { ...frontendPkg.dependencies, ...frontendPkg.devDependencies };
    const backendDeps = { ...backendPkg.dependencies, ...backendPkg.devDependencies };
    
    const requiredFrontend = ['react', 'typescript', 'vite', 'tailwindcss'];
    const requiredBackend = ['express', 'typescript', 'nodemon'];
    
    requiredFrontend.forEach(dep => {
      if (frontendDeps[dep]) {
        log(`✅ Frontend: ${dep} v${frontendDeps[dep]}`, 'green');
      } else {
        log(`❌ Frontend missing: ${dep}`, 'red');
      }
    });
    
    requiredBackend.forEach(dep => {
      if (backendDeps[dep]) {
        log(`✅ Backend: ${dep} v${backendDeps[dep]}`, 'green');
      } else {
        log(`❌ Backend missing: ${dep}`, 'red');
      }
    });
  } catch (error) {
    log(`❌ Error checking dependencies: ${error.message}`, 'red');
  }
  
  // Check if servers are running
  log('\n🌐 Development Servers:', 'cyan');
  const backendRunning = await checkPort(3001, 'Backend API');
  const frontendRunning = await checkPort(5173, 'Frontend Dev Server');
  
  // Test API endpoints if backend is running
  if (backendRunning) {
    log('\n🔌 API Endpoints:', 'cyan');
    const apiTests = [
      ['http://localhost:3001/health', 'Health Check'],
      ['http://localhost:3001/api/dashboard/metrics', 'Dashboard Metrics'],
      ['http://localhost:3001/api/insights?range=24h', 'Insights API'],
    ];
    
    for (const [url, description] of apiTests) {
      await makeHttpRequest(url, description);
    }
  }
  
  // Summary
  log('\n📋 Setup Summary:', 'bold');
  
  if (structureValid) {
    log('✅ Project structure is correct', 'green');
  } else {
    log('❌ Project structure has issues', 'red');
  }
  
  if (backendRunning && frontendRunning) {
    log('✅ Both servers are running', 'green');
    log('\n🎯 Ready for development!', 'bold');
    log('📖 Open http://localhost:5173 to start coding', 'blue');
  } else {
    log('\n⚠️  Servers not running. Start with:', 'yellow');
    log('   npm run dev', 'cyan');
  }
  
  log('\n📚 Documentation:', 'cyan');
  log('• Main README: ./README.md');
  log('• Frontend README: ./frontend/README.md'); 
  log('• Backend README: ./backend/README.md');
  log('• API Documentation: Backend README');
  
  log('\n🧪 Quick Test Commands:', 'cyan');
  log('• Test API: curl http://localhost:3001/api/dashboard/metrics');
  log('• Test Error: curl "http://localhost:3001/api/insights?range=error"');
  
  log('\n💡 Need help? Check the README files for detailed instructions.\n');
}

// Run validation
main().catch(error => {
  log(`\n❌ Validation failed: ${error.message}`, 'red');
  process.exit(1);
});


import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const CodeSnippet = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="hidden lg:block max-w-md ml-auto mt-10 lg:mt-0"
    >
      <div className="relative">
        <Card className="neo-glass-card p-5 relative z-10 overflow-hidden border-t border-l border-white/20 dark:border-white/10">
          <div className="flex items-center mb-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto text-xs font-mono opacity-50">portfolio.jsx</div>
          </div>
          <pre className="text-sm text-left overflow-x-auto p-4 bg-foreground/5 rounded-lg">
            <code className="font-mono">
              <span className="text-blue-500">import</span> <span className="text-green-500">React</span> <span className="text-blue-500">from</span> <span className="text-amber-500">'react'</span>;
              <br />
              <br />
              <span className="text-blue-500">const</span> <span className="text-green-500">Developer</span> = () <span className="text-blue-500">=&gt;</span> {`{`}
              <br />
              &nbsp;&nbsp;<span className="text-blue-500">const</span> <span className="text-purple-500">skills</span> = [
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-500">'React'</span>, 
              <span className="text-amber-500">'Node.js'</span>, 
              <span className="text-amber-500">'Python'</span>, 
              <span className="text-amber-500">'AI'</span>
              <br />
              &nbsp;&nbsp;];
              <br />
              &nbsp;&nbsp;<span className="text-blue-500">return</span> (
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-500">{`<div>`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-500">{`<h1>`}</span>Rahul Thota<span className="text-cyan-500">{`</h1>`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-500">{`<p>`}</span>Building innovative solutions<span className="text-cyan-500">{`</p>`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-500">{`</div>`}</span>
              <br />
              &nbsp;&nbsp;);
              <br />
              {`}`};
              <br /><br />
              <span className="text-blue-500">export default</span> <span className="text-green-500">Developer</span>;
            </code>
          </pre>
          <div className="absolute bottom-3 right-3">
            <div className="text-xs text-foreground/50 font-mono">Ready to collaborate ✨</div>
          </div>
        </Card>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full -z-10 opacity-30 dark:opacity-40"></div>
      </div>
    </motion.div>
  );
};

export default CodeSnippet;

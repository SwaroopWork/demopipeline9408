#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DemoawspipelineStack } from '../lib/demoawspipeline-stack';

const app = new cdk.App();
new DemoawspipelineStack(app, 'DemoawspipelineStack', {
  
   env: { account: '715841370050', region: 'ap-south-1' },

  
});
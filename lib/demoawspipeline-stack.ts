import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { CodePipeline, CodePipelineSource, ShellStep} from 'aws-cdk-lib/pipelines';
import { PipelineAppStage } from './demoawspipeline-app-stack';
import {ManualApprovalStep} from 'aws-cdk-lib/pipelines';


export class DemoawspipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const democicdpipeline=new CodePipeline(this,'demopipeline',
      {
        synth: new ShellStep('Synth', {
          input: CodePipelineSource.gitHub('SwaroopWork/demopipeline9408','main'),
          commands: ['npm ci', 'npm run build', 'npx cdk synth',

          ],
        }),
        pipelineName: "bci-local-test-pipeline"
      });

      const testingStage=democicdpipeline.addStage(new PipelineAppStage(this,'test', {
        env: { account: '715841370050', region: 'ap-south-1' }

      }));

      testingStage.addPost(new ManualApprovalStep('approval'));

      const prodStage=democicdpipeline.addStage(new PipelineAppStage(this,'prod', {
        env: { account: '715841370050', region: 'ap-south-1' }

      }));
        
      
  }
}

import React, { useState, useEffect } from 'react';
import { Camera, Mic, Play, Square, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';

const InterviewInterface: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [confidence, setConfidence] = useState<number>(75);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const mockQuestions: string[] = [
    "Tell me about yourself and your background.",
    "What are your greatest strengths and weaknesses?",
    "Where do you see yourself in five years?",
    "Why should we hire you for this position?"
  ];

  const startInterview = (): void => {
    setIsRecording(true);
    setCurrentQuestion(mockQuestions[0]);
    setFeedback('');
  };

  const stopInterview = (): void => {
    setIsRecording(false);
    setFeedback('Great job! Your confidence level was steady throughout the response. Consider maintaining more eye contact and speaking at a slightly slower pace.');
  };

  useEffect(() => {
    let interval: number;
    
    if (isRecording) {
      interval = window.setInterval(() => {
        setConfidence(prev => Math.min(Math.max(prev + (Math.random() * 10 - 5), 0), 100));
      }, 2000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AURA-LYTICS Interview Session</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Video Preview */}
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <Camera className="w-16 h-16 text-gray-400" />
            </div>
            
            {/* Metrics Panel */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span>Confidence Level</span>
                    <span className="font-bold">{confidence.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${Math.min(Math.max(confidence, 0), 100)}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              {/* Controls */}
              <div className="flex gap-2">
                {!isRecording ? (
                  <Button onClick={startInterview} className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Start Interview
                  </Button>
                ) : (
                  <Button onClick={stopInterview} variant="destructive" className="flex items-center gap-2">
                    <Square className="w-4 h-4" />
                    Stop Recording
                  </Button>
                )}
                <Button variant="outline" className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4" />
                  View Analytics
                </Button>
              </div>
            </div>
          </div>

          {/* Current Question */}
          {currentQuestion && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Current Question:</h3>
                <p>{currentQuestion}</p>
              </CardContent>
            </Card>
          )}

          {/* Feedback */}
          {feedback && (
            <Alert className="mt-4">
              <AlertDescription>{feedback}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewInterface;
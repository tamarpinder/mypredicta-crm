'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  Gamepad2, 
  User,
  Settings,
  Zap,
  Trophy,
  Coins,
  Clock,
  BarChart3
} from 'lucide-react';
import { AIInsights } from '@/types';
import { sampleCustomers } from '@/data/sample-data';
import { formatNumber } from '@/utils/format';
import { advancedAIInsights } from '@/data/advanced-ai-insights';
import { toastSuccess } from '@/hooks/use-toast';

interface RecommendationEngineProps {
  recommendations: AIInsights['gameRecommendations'];
  compact?: boolean;
}

export function RecommendationEngine({ recommendations, compact = false }: RecommendationEngineProps) {
  // For now, treat all recommendations as game recommendations since that's what we have in the data
  const gameRecommendations = recommendations;
  
  // Get promotional offers and experience recommendations from advanced AI insights
  const offerRecommendations = advancedAIInsights.promotionalOffers || [];
  const experienceRecommendations = advancedAIInsights.experienceRecommendations || [];


  const getRecommendationColor = (type: string) => {
    switch (type) {
      case 'game':
        return 'text-blue-600 bg-blue-100';
      case 'offer':
        return 'text-green-600 bg-green-100';
      case 'experience':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCustomerInfo = (customerId: string) => {
    return sampleCustomers.find(c => c.id === customerId) || {
      firstName: 'Unknown',
      lastName: 'Customer',
      email: 'unknown@example.com',
      lifetimeValue: 0,
      segment: 'regular'
    };
  };

  // Action handlers with success toasts
  const handleSendRecommendation = (customerName: string, type: string) => {
    toastSuccess(
      'Recommendation Sent!',
      `Game recommendation has been sent to ${customerName} successfully.`
    );
  };

  const handleSendOffer = (customerName: string, offerType: string) => {
    toastSuccess(
      'Offer Sent!', 
      `${offerType} has been sent to ${customerName} successfully.`
    );
  };

  const handleImplementExperience = (customerName: string, experienceType: string) => {
    toastSuccess(
      'Experience Implemented!',
      `${experienceType} has been implemented for ${customerName}.`
    );
  };

  const handleDeployAllRecommendations = () => {
    toastSuccess(
      'All Recommendations Deployed!',
      `Successfully deployed ${gameRecommendations.length} game recommendations to targeted customers.`
    );
  };

  const handleDeployAllOffers = () => {
    toastSuccess(
      'All Offers Deployed!',
      `Successfully deployed ${offerRecommendations.length} promotional offers to targeted customers.`
    );
  };

  const handleImplementAllExperiences = () => {
    toastSuccess(
      'All Experiences Implemented!',
      `Successfully implemented ${experienceRecommendations.length} experience improvements.`
    );
  };


  if (compact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{gameRecommendations.length}</div>
                <div className="text-sm text-muted-foreground">Games</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{offerRecommendations.length}</div>
                <div className="text-sm text-muted-foreground">Offers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{experienceRecommendations.length}</div>
                <div className="text-sm text-muted-foreground">Experience</div>
              </div>
            </div>
            
            <div className="space-y-3">
              {recommendations.slice(0, 5).map((recommendation, index) => {
                const customer = getCustomerInfo(recommendation.customerId);
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">
                          {customer.firstName} {customer.lastName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {recommendation.recommendedGames 
                            ? recommendation.recommendedGames.join(', ')
                            : recommendation.recommendedGame || 'Multiple games'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getRecommendationColor('game')}>
                        Games
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {typeof recommendation.expectedEngagement === 'number' 
                          ? `${recommendation.expectedEngagement}% match`
                          : recommendation.expectedEngagement || 'High engagement'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Recommendation Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Recommendation Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-4 bg-blue-50 rounded-lg mb-2">
                <Gamepad2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{gameRecommendations.length}</div>
                <div className="text-sm text-muted-foreground">Game Recommendations</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Personalized game suggestions
              </div>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-green-50 rounded-lg mb-2">
                <Coins className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{offerRecommendations.length}</div>
                <div className="text-sm text-muted-foreground">Offer Recommendations</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Targeted promotional offers
              </div>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-purple-50 rounded-lg mb-2">
                <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{experienceRecommendations.length}</div>
                <div className="text-sm text-muted-foreground">Experience Recommendations</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Enhanced user experiences
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5" />
              Game Recommendations
            </CardTitle>
            <Button size="sm" variant="outline" onClick={handleDeployAllRecommendations}>
              Deploy All Recommendations
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gameRecommendations.map((recommendation, index) => {
              const customer = getCustomerInfo(recommendation.customerId);
              return (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {customer.firstName} {customer.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Current Segment: {customer.segment}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getRecommendationColor(recommendation.type)}>
                        {recommendation.type}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        {recommendation.confidence ? `${(recommendation.confidence * 100).toFixed(0)}% match` : 'High match'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Engagement Score</span>
                      <span>{typeof recommendation.expectedEngagement === 'number' 
                        ? `${recommendation.expectedEngagement}%`
                        : recommendation.expectedEngagement || '85%'}</span>
                    </div>
                    <Progress value={typeof recommendation.expectedEngagement === 'number' 
                      ? recommendation.expectedEngagement 
                      : 85} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Recommended Games</div>
                      <div className="font-medium">
                        {recommendation.recommendedGames 
                          ? recommendation.recommendedGames.join(', ')
                          : recommendation.recommendedGame || 'Various games'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Expected Engagement</div>
                      <div className="font-medium text-green-600">
                        {typeof recommendation.expectedEngagement === 'number' 
                          ? `${recommendation.expectedEngagement}%`
                          : recommendation.expectedEngagement || '85%'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-muted-foreground mb-2">AI Reasoning:</div>
                    <div className="text-sm bg-blue-50 p-2 rounded-lg">
                      {recommendation.reason}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1"
                      onClick={() => handleSendRecommendation(`${customer.firstName} ${customer.lastName}`, 'game')}
                    >
                      <Zap className="h-4 w-4" />
                      Send Recommendation
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Settings className="h-4 w-4" />
                      Customize
                    </Button>
                    <Button size="sm" className="gap-1">
                      <User className="h-4 w-4" />
                      View Profile
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Promotional Offers */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              Promotional Offers
            </CardTitle>
            <Button size="sm" variant="outline" onClick={handleDeployAllOffers}>
              Deploy All Offers
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {offerRecommendations.map((offer: any, index: number) => {
              const customer = getCustomerInfo(offer.customerId);
              return (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {customer.firstName} {customer.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {offer.location} • {offer.gameCategory}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getRecommendationColor('offer')}>
                        {offer.offerType}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        {offer.conversionProbability}% conversion rate
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Conversion Probability</span>
                      <span>{offer.conversionProbability}%</span>
                    </div>
                    <Progress value={offer.conversionProbability} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Bonus Amount</div>
                      <div className="font-medium text-green-600">
                        {offer.bonusPercentage}% up to ${offer.maxBonus}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Expected Revenue</div>
                      <div className="font-medium text-blue-600">
                        ${offer.expectedRevenue}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">Min Deposit</div>
                      <div className="font-medium">${offer.minDeposit}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Wagering</div>
                      <div className="font-medium">{offer.wagering}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Valid</div>
                      <div className="font-medium">{offer.validDays} days</div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-muted-foreground mb-2">AI Reasoning:</div>
                    <div className="text-sm bg-green-50 p-2 rounded-lg">
                      {offer.personalizedReason}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1"
                      onClick={() => handleSendOffer(`${customer.firstName} ${customer.lastName}`, offer.offerType)}
                    >
                      <Zap className="h-4 w-4" />
                      Send Offer
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Settings className="h-4 w-4" />
                      Customize
                    </Button>
                    <Button size="sm" className="gap-1">
                      <User className="h-4 w-4" />
                      View Profile
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Experience Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Experience Recommendations
            </CardTitle>
            <Button size="sm" variant="outline" onClick={handleImplementAllExperiences}>
              Implement All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {experienceRecommendations.map((experience: any, index: number) => {
              const customer = getCustomerInfo(experience.customerId);
              return (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {customer.firstName} {customer.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {experience.location} • Current Segment: {customer.segment}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getRecommendationColor('experience')}>
                        {experience.experienceType}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        {experience.expectedSatisfaction}% satisfaction
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Expected Satisfaction</span>
                      <span>{experience.expectedSatisfaction}%</span>
                    </div>
                    <Progress value={experience.expectedSatisfaction} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Retention Impact</div>
                      <div className="font-medium text-green-600">
                        +{experience.retentionImpact}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Implementation Time</div>
                      <div className="font-medium text-blue-600">
                        {experience.timeToImplement}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-muted-foreground">Implementation Method</div>
                    <div className="font-medium">{experience.implementation}</div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-muted-foreground mb-2">AI Reasoning:</div>
                    <div className="text-sm bg-purple-50 p-2 rounded-lg">
                      {experience.personalizedReason}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1"
                      onClick={() => handleImplementExperience(`${customer.firstName} ${customer.lastName}`, experience.experienceType)}
                    >
                      <Zap className="h-4 w-4" />
                      Implement
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Settings className="h-4 w-4" />
                      Customize
                    </Button>
                    <Button size="sm" className="gap-1">
                      <User className="h-4 w-4" />
                      View Profile
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recommendation Engine Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">87.3%</div>
              <div className="text-sm text-muted-foreground">Click-through Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">73.8%</div>
              <div className="text-sm text-muted-foreground">Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">+24.7%</div>
              <div className="text-sm text-muted-foreground">Revenue Uplift</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">91.2%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">
              <strong>Algorithm:</strong> Collaborative filtering + Deep learning • 
              <strong>Training Data:</strong> 2.3M interactions • 
              <strong>Last Updated:</strong> 1 hour ago
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Trash2 } from "lucide-react";

export default function ReviewCard({ review, onDelete, showDeleteButton = false }) {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-accent fill-accent' : 'text-neutral-300'}`}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30 border-2 border-transparent hover:border-blue-200/50">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-full">
            <div className="flex mr-2">
              {renderStars(review.rating)}
            </div>
            <span className="text-sm font-semibold text-neutral-700">{review.rating}.0</span>
          </div>
          
          {showDeleteButton && onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(review.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <blockquote className="text-neutral-700 mb-6 leading-relaxed text-lg italic border-l-4 border-blue-500 pl-4 bg-blue-50/30 py-3 rounded-r-lg">
          "{review.description}"
        </blockquote>
        
        <div className="flex items-center justify-between bg-white/60 p-4 rounded-lg border border-gray-100">
          <div className="flex items-center">
            <Avatar className="w-12 h-12 mr-4 ring-2 ring-blue-200">
              <AvatarImage src={review.userImage} alt={review.userName} />
              <AvatarFallback className="bg-blue-600 text-white font-bold">
                {review.userName?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold text-neutral-900 text-lg">{review.userName}</div>
              <div className="text-sm text-blue-600 font-medium">{review.propertyTitle}</div>
            </div>
          </div>
          
          {review.createdAt && (
            <div className="text-xs text-neutral-500 bg-gray-100 px-2 py-1 rounded">
              {formatDate(review.createdAt)}
            </div>
          )}
        </div>
        
        {review.agentName && (
          <div className="mt-4 text-sm text-neutral-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
            <span className="font-medium">Agent:</span> <span className="text-green-700 font-semibold">{review.agentName}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

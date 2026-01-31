"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

interface AddCustomerPageProps {
  onBack: () => void;
}

export function AddCustomerPage({ onBack }: AddCustomerPageProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Add New Customer</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create a new customer profile
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="mx-auto w-full max-w-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Customer Name</Label>
            <Input id="name" placeholder="Enter full name" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input id="phone" placeholder="+880 1XXX-XXXXXX" type="tel" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input id="email" placeholder="email@example.com" type="email" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Division</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dhaka">Dhaka</SelectItem>
                  <SelectItem value="chittagong">Chittagong</SelectItem>
                  <SelectItem value="sylhet">Sylhet</SelectItem>
                  <SelectItem value="rajshahi">Rajshahi</SelectItem>
                  <SelectItem value="khulna">Khulna</SelectItem>
                  <SelectItem value="barisal">Barisal</SelectItem>
                  <SelectItem value="rangpur">Rangpur</SelectItem>
                  <SelectItem value="mymensingh">Mymensingh</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>District</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dhaka">Dhaka</SelectItem>
                  <SelectItem value="gazipur">Gazipur</SelectItem>
                  <SelectItem value="narayanganj">Narayanganj</SelectItem>
                  <SelectItem value="chittagong">Chittagong</SelectItem>
                  <SelectItem value="comilla">Comilla</SelectItem>
                  <SelectItem value="sylhet">Sylhet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea
              id="address"
              placeholder="House, Road, Area, City..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special instructions or notes about this customer..."
              className="min-h-[80px]"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button>
              Save Customer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
